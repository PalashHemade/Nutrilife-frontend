'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Leaf, Mail, Lock, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setError(''); setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    router.push('/dashboard');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.875rem 1rem 0.875rem 2.75rem',
    borderRadius: '0.75rem',
    border: '1.5px solid #E2E8F0',
    background: '#F8FAFC',
    color: '#1E293B',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'Inter, sans-serif',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left panel */}
      <div style={{ display: 'none', width: '50%', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #00C896 0%, #0EA5A4 100%)' }} className="lg:flex lg:flex-col lg:justify-center">
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-6rem', left: '-6rem', width: '24rem', height: '24rem', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: '-6rem', right: '-6rem', width: '24rem', height: '24rem', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '3.5rem' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf style={{ width: '1.25rem', height: '1.25rem', color: '#fff' }} />
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>NutriLife</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>
              Welcome Back,<br />Diet Consultant
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Access your dashboard to manage patients, generate personalized diet plans, and track consultation appointments.
            </p>
            {[
              'Manage 1200+ active patients',
              'AI-powered diet plan generation',
              'Schedule & track consultations',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: 'rgba(255,255,255,0.85)', flexShrink: 0 }} />
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem' }}>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', background: '#F8FAFC' }}>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} style={{ width: '100%', maxWidth: '26rem' }}>
          {/* Mobile logo */}
          <div className="lg:hidden" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <div style={{ width: '2rem', height: '2rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg,#00C896,#0EA5A4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf style={{ width: '1rem', height: '1rem', color: '#fff' }} />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>NutriLife</span>
          </div>

          {/* Card */}
          <div style={{ background: '#fff', borderRadius: '1.5rem', boxShadow: '0 20px 60px rgba(0,200,150,0.12)', border: '1px solid #E2E8F0', padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.25rem' }}>Sign In</h2>
            <p style={{ color: '#94A3B8', fontSize: '0.875rem', marginBottom: '2rem' }}>Diet Consultant Portal</p>

            <form onSubmit={handleLogin}>
              {/* Email */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: '#94A3B8' }} />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="consultant@nutrilife.in"
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#00C896'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(0,200,150,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: '#94A3B8' }} />
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                    style={{ ...inputStyle, paddingRight: '3rem' }}
                    onFocus={e => { e.target.style.borderColor = '#00C896'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(0,200,150,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex', alignItems: 'center' }}>
                    {showPass ? <EyeOff style={{ width: '1rem', height: '1rem' }} /> : <Eye style={{ width: '1rem', height: '1rem' }} />}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => setRemember(!remember)}>
                  <div style={{ width: '1.125rem', height: '1.125rem', borderRadius: '0.3rem', border: remember ? '2px solid #00C896' : '2px solid #CBD5E1', background: remember ? 'linear-gradient(135deg,#00C896,#0EA5A4)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {remember && <CheckCircle style={{ width: '0.7rem', height: '0.7rem', color: '#fff' }} />}
                  </div>
                  <span style={{ fontSize: '0.875rem', color: '#475569' }}>Remember me</span>
                </label>
                <button type="button" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#00C896', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Forgot password?
                </button>
              </div>

              {error && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#EF4444', fontSize: '0.875rem' }}>
                  {error}
                </div>
              )}

              {/* Submit */}
              <motion.button type="submit" disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}
                style={{ width: '100%', padding: '1rem', color: '#fff', fontWeight: 700, fontSize: '1rem', background: 'linear-gradient(135deg, #00C896, #0EA5A4)', borderRadius: '0.875rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 8px 24px rgba(0,200,150,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: loading ? 0.75 : 1, fontFamily: 'Inter, sans-serif' }}>
                {loading ? (<><Loader2 style={{ width: '1.125rem', height: '1.125rem', animation: 'spin 1s linear infinite' }} />Signing in...</>) : 'Sign In to Dashboard'}
              </motion.button>
            </form>

            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94A3B8', marginTop: '1.5rem' }}>
              Protected portal for NutriLife certified consultants only.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
