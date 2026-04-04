import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib

def main():
    print("Loading dataset...")
    df = pd.read_csv("diet_recommendations_dataset.csv")
    
    # Target variable
    y = df["Diet_Recommendation"]
    
    # Features to use for prediction (excluding IDs and non-relevant post-prediction stats)
    # Mapping our FastApi payload `HealthStatus` to dataset concepts:
    # We'll use: Age, Gender, Weight_kg, Height_cm, Glucose_mg/dL, Cholesterol_mg/dL
    # We will ignore some fields from dataset that we don't have in base payload, OR we can use them all.
    # For a perfect match with our FastAPI schema and UI inputs:
    features = ["Age", "Gender", "Weight_kg", "Height_cm", "Glucose_mg/dL", "Cholesterol_mg/dL"]
    
    X = df[features]
    
    # Fill NaN just in case
    X = X.fillna({
        "Glucose_mg/dL": 100, 
        "Cholesterol_mg/dL": 150
    })

    print("Building pipeline...")
    categorical_features = ["Gender"]
    numeric_features = ["Age", "Weight_kg", "Height_cm", "Glucose_mg/dL", "Cholesterol_mg/dL"]

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), numeric_features),
            ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features),
        ]
    )

    clf = Pipeline(steps=[
        ("preprocessor", preprocessor),
        ("classifier", RandomForestClassifier(n_estimators=100, random_state=42))
    ])

    print("Training model...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    clf.fit(X_train, y_train)
    
    score = clf.score(X_test, y_test)
    print(f"Model trained with accuracy: {score:.2f}")

    print("Saving model to model.pkl...")
    joblib.dump(clf, "model.pkl")
    print("Model saved successfully.")

if __name__ == "__main__":
    main()
