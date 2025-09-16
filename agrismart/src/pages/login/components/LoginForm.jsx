import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
// import { signInWithPopup } from 'firebase/auth';
// import { auth, googleProvider } from '../../../lib/firebase';
import { apiPost } from '../../../lib/api';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Google login can be implemented if backend supports OAuth
  const handleGoogle = async () => {
    setErrors({ general: 'Google sign-in is not supported in backend login.' });
  };


  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await apiPost('/auth/login', {
        email: formData.email,
        password: formData.password
      });
      // Save token and user info
      if (res?.access_token) {
        localStorage.setItem('auth_token', res.access_token);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userProfile', JSON.stringify(res.user));
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }
        navigate('/dashboard');
      } else {
        setErrors({ general: res?.message || 'Login failed. Please try again.' });
      }
    } catch (err) {
      setErrors({ general: err?.message || 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.general && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} color="var(--color-error)" />
            <div>
              <p className="text-sm text-error font-medium">{t('login.failed')}</p>
              <p className="text-sm text-error/80 mt-1">{errors?.general}</p>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-4">
        <Input
          label={t('login.email')}
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          className="w-full"
        />

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-foreground">{t('login.password')}</label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
              className="pr-10"
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground hover:text-foreground"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 text-sm text-muted-foreground cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
          />
          <span>{t('login.remember')}</span>
        </label>
        <button type="button" className="text-sm text-primary hover:underline">
          {t('login.forgot')}
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="right"
      >
        {isLoading ? t('login.signingIn') : t('login.signin')}
      </Button>

      <div className="relative py-2 text-center text-xs opacity-70">
        <span className="px-2 bg-transparent">{t('common.or')}</span>
      </div>

      <Button
        type="button"
        variant="outline"
        size="lg"
        fullWidth
        onClick={handleGoogle}
        iconName="Chrome"
        iconPosition="left"
      >
        {t('login.continueGoogle')}
      </Button>
    </form>
  );
};

export default LoginForm;