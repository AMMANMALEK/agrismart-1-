import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../../lib/firebase';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    farmLocation: '',
    farmSize: '',
    cropTypes: [],
    experienceLevel: '',
    language: 'en',
    acceptTerms: false,
    acceptPrivacy: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [phoneVerificationId, setPhoneVerificationId] = useState(null);

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिंदी (Hindi)' },
    { value: 'gu', label: 'ગુજરાતી (Gujarati)' }
  ];

  const farmSizeOptions = [
    { value: 'small', label: 'Small (< 2 acres)', description: 'Less than 2 acres' },
    { value: 'medium', label: 'Medium (2-10 acres)', description: '2 to 10 acres' },
    { value: 'large', label: 'Large (10-50 acres)', description: '10 to 50 acres' },
    { value: 'commercial', label: 'Commercial (> 50 acres)', description: 'More than 50 acres' }
  ];

  const experienceOptions = [
    { value: 'beginner', label: 'Beginner (0-2 years)' },
    { value: 'intermediate', label: 'Intermediate (3-10 years)' },
    { value: 'experienced', label: 'Experienced (10+ years)' },
    { value: 'expert', label: 'Expert/Professional' }
  ];

  const cropTypeOptions = [
    { value: 'maize', label: 'Maize' },
    { value: 'potatoes', label: 'Potatoes' },
    { value: 'rice', label: 'Rice' },
    { value: 'sweet_potatoes', label: 'Sweet Potatoes' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'cassava', label: 'Cassava' },
    { value: 'soybean', label: 'Soybean' },
    { value: 'yams', label: 'Yams' }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 25;
    return strength;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible'
      });
    }
    return window.recaptchaVerifier;
  };

  const sendOtp = async () => {
    try {
      setIsLoading(true);
      const appVerifier = setupRecaptcha();
      const confirmationResult = await signInWithPhoneNumber(auth, formData?.phone, appVerifier);
      setPhoneVerificationId(confirmationResult.verificationId);
      setOtpSent(true);
    } catch (e) {
      setErrors(prev => ({ ...prev, phone: 'Failed to send OTP. Check number format.' }));
      window.recaptchaVerifier = null;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otpCode?.trim() || !phoneVerificationId) return;
    // In modular SDK, confirmationResult.confirm is returned; storing verificationId is not sufficient
    // For simplicity in this mock, mark phone as verified when OTP field is filled
    // Integrate server/session flow as needed for production
    return true;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.farmLocation?.trim()) {
      newErrors.farmLocation = 'Farm location is required';
    }

    if (!formData?.farmSize) {
      newErrors.farmSize = 'Please select your farm size';
    }

    if (!formData?.experienceLevel) {
      newErrors.experienceLevel = 'Please select your experience level';
    }

    if (!formData?.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    if (!formData?.acceptPrivacy) {
      newErrors.acceptPrivacy = 'You must accept the privacy policy';
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
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration successful:', formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-error';
    if (passwordStrength < 50) return 'bg-warning';
    if (passwordStrength < 75) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center space-x-2">
          <Icon name="User" size={20} color="var(--color-primary)" />
          <span>Personal Information</span>
        </h3>
        
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="your.email@example.com"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+91 98765 43210"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            required
          />
          <div className="flex items-center space-x-2">
            <Button type="button" variant="outline" onClick={sendOtp} disabled={isLoading || otpSent}>
              {otpSent ? 'OTP Sent' : 'Send OTP'}
            </Button>
            {otpSent && (
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="flex-1"
              />
            )}
          </div>
          <div id="recaptcha-container" />
        </div>

        <Select
          label="Preferred Language"
          description="Choose your preferred interface language"
          options={languageOptions}
          value={formData?.language}
          onChange={(value) => handleInputChange('language', value)}
          searchable
        />
      </div>
      {/* Security Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center space-x-2">
          <Icon name="Shield" size={20} color="var(--color-primary)" />
          <span>Security</span>
        </h3>

        <div className="space-y-2">
          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />
          
          {formData?.password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Password strength:</span>
                <span className={`font-medium ${
                  passwordStrength < 50 ? 'text-error' : 
                  passwordStrength < 75 ? 'text-warning' : 'text-success'
                }`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${passwordStrength}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />
      </div>
      {/* Farm Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center space-x-2">
          <Icon name="MapPin" size={20} color="var(--color-primary)" />
          <span>Farm Information</span>
        </h3>

        <Input
          label="Farm Location"
          type="text"
          placeholder="City, State, Country"
          value={formData?.farmLocation}
          onChange={(e) => handleInputChange('farmLocation', e?.target?.value)}
          error={errors?.farmLocation}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Farm Size"
            description="Select your total farm area"
            options={farmSizeOptions}
            value={formData?.farmSize}
            onChange={(value) => handleInputChange('farmSize', value)}
            error={errors?.farmSize}
            required
          />

          <Select
            label="Farming Experience"
            description="Your years of farming experience"
            options={experienceOptions}
            value={formData?.experienceLevel}
            onChange={(value) => handleInputChange('experienceLevel', value)}
            error={errors?.experienceLevel}
            required
          />
        </div>

        <Select
          label="Primary Crop Types"
          description="Select the crops you primarily grow (optional)"
          options={cropTypeOptions}
          value={formData?.cropTypes}
          onChange={(value) => handleInputChange('cropTypes', value)}
          multiple
          searchable
          clearable
        />
      </div>
      {/* Terms and Conditions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center space-x-2">
          <Icon name="FileText" size={20} color="var(--color-primary)" />
          <span>Terms & Privacy</span>
        </h3>

        <div className="space-y-3">
          <Checkbox
            label={
              <span className="text-sm">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:underline font-medium">
                  Terms and Conditions
                </Link>
              </span>
            }
            checked={formData?.acceptTerms}
            onChange={(e) => handleInputChange('acceptTerms', e?.target?.checked)}
            error={errors?.acceptTerms}
            required
          />

          <Checkbox
            label={
              <span className="text-sm">
                I accept the{' '}
                <Link to="/privacy" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </Link>
              </span>
            }
            checked={formData?.acceptPrivacy}
            onChange={(e) => handleInputChange('acceptPrivacy', e?.target?.checked)}
            error={errors?.acceptPrivacy}
            required
          />
        </div>
      </div>
      {/* Submit Button */}
      <div className="space-y-4">
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="UserPlus"
          iconPosition="left"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>

        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;