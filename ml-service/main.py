from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import random

app = FastAPI(title="NutriLife ML Service")

class HealthStatus(BaseModel):
    age: int
    height: float
    weight: float
    gender: str
    bmr: Optional[float] = None
    glucoseLevel: Optional[float] = None
    cholesterol: Optional[float] = None
    allergies: List[str] = []
    dietaryPreferences: List[str] = []
    goals: List[str] = []

class PredictionResult(BaseModel):
    mealCategory: str
    recommendations: List[str]
    caloricTarget: float
    macros: dict

@app.get("/")
def read_root():
    return {"message": "Welcome to the NutriLife ML Recommender API"}

import joblib
import pandas as pd

# Load the trained pipeline (which includes preprocessor and classifier)
# Normally you'd want to load this at app startup, but for simplicity here we can load it on demand or globally.
try:
    classifier = joblib.load("model.pkl")
    print("Model loaded successfully.")
except Exception as e:
    classifier = None
    print(f"Error loading model: {e}")

@app.post("/predict", response_model=PredictionResult)
def predict_diet(profile: HealthStatus):
    """
    Endpoint that uses a trained Random Forest model classifying a user
    into a diet plan category based on their clinical and anthropometric data.
    """
    
    assigned_category = "Balanced Diet" # Default
    
    if classifier:
        # Create a DataFrame for inference from the profile
        input_data = pd.DataFrame([{
            "Age": profile.age,
            "Gender": profile.gender.capitalize() if profile.gender else "Male", # Or another default
            "Weight_kg": profile.weight,
            "Height_cm": profile.height,
            "Glucose_mg/dL": profile.glucoseLevel if profile.glucoseLevel is not None else 100.0,
            "Cholesterol_mg/dL": profile.cholesterol if profile.cholesterol is not None else 150.0
        }])
        
        try:
            prediction = classifier.predict(input_data)
            assigned_category = str(prediction[0])
        except Exception as e:
            print(f"Inference error: {e}")

    # Keep caloric logic the same
    caloric_target = profile.bmr or 2000.0
    if "weightLoss" in profile.goals:
        caloric_target -= 300
    elif "muscleGain" in profile.goals:
        caloric_target += 300
        
    return PredictionResult(
        mealCategory=assigned_category.replace("_", " "),
        recommendations=[
            f"Focus on {assigned_category.replace('_', ' ')} friendly foods.",
            "Stay hydrated, drink at least 2 liters of water daily.",
            "Maintain consistency with your macro splits for optimal results.",
        ],
        caloricTarget=round(caloric_target, 2),
        macros={
            "protein": "30%",
            "carbs": "40%",
            "fats": "30%"
        }
    )
