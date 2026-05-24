import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, RadialBarChart, RadialBar, ScatterChart, Scatter } from 'recharts';
import { Calendar, Brain, Users, FileText, Settings, Plus, TrendingUp, Download, User, BookOpen, ChevronRight, ChevronLeft, Home, BarChart3, Edit3, Eye, Save, Trash2, Info, CheckCircle, AlertCircle, Star, Award, Clock, Target, Filter, Search, Moon, Sun, Type, Zap, X, Menu, Shield, UserCheck, Activity, Stethoscope, Clipboard, AlertTriangle, Bell, Database, Lock, Globe, Printer, Mail, Phone, MapPin, Heart, Thermometer, Pill, Microscope } from 'lucide-react';

// Enhanced Clinical Data Models
const ClinicalDataModel = {
  patient: {
    id: '',
    mrn: '',
    demographics: {
      name: '',
      dob: '',
      gender: '',
      ethnicity: '',
      primaryLanguage: '',
      emergencyContact: {
        name: '',
        relationship: '',
        phone: '',
        email: ''
      }
    },
    clinicalInfo: {
      primaryDiagnoses: [],
      comorbidities: [],
      medications: [],
      allergies: [],
      referringProvider: '',
      treatmentGoals: [],
      insuranceInfo: {
        primary: '',
        secondary: '',
        memberId: ''
      }
    },
    careTeam: {
      primaryProvider: '',
      psychiatrist: '',
      therapist: '',
      caseManager: '',
      emergencyContact: ''
    }
  },
  
  clinicalOutcomes: {
    gaf: { score: 0, date: '', assessedBy: '', notes: '' },
    cgas: { score: 0, date: '', assessedBy: '', notes: '' },
    functionalAssessment: {
      workSchool: { score: 0, notes: '' },
      socialRelationships: { score: 0, notes: '' },
      dailyLiving: { score: 0, notes: '' },
      selfCare: { score: 0, notes: '' }
    },
    qualityOfLife: {
      physicalHealth: 0,
      mentalHealth: 0,
      socialSupport: 0,
      environmentalFactors: 0,
      overallSatisfaction: 0
    }
  }
};

// Assessment Data with Clinical Validity
const ASRS_QUESTIONS = [
  { id: 1, text: "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?", part: "A", category: "Executive Function", clinicalWeight: 0.85 },
  { id: 2, text: "How often do you have difficulty getting things in order when you have to do a task that requires organization?", part: "A", category: "Executive Function", clinicalWeight: 0.90 },
  { id: 3, text: "How often do you have problems remembering appointments or obligations?", part: "A", category: "Executive Function", clinicalWeight: 0.88 },
  { id: 4, text: "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?", part: "A", category: "Executive Function", clinicalWeight: 0.82 },
  { id: 5, text: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?", part: "A", category: "Hyperactivity", clinicalWeight: 0.75 },
  { id: 6, text: "How often do you feel overly active and compelled to do things, like you were driven by a motor?", part: "A", category: "Hyperactivity", clinicalWeight: 0.80 },
  { id: 7, text: "How often do you make careless mistakes when you have to work on a boring or difficult project?", part: "B", category: "Attention", clinicalWeight: 0.70 },
  { id: 8, text: "How often do you have difficulty keeping your attention when you are doing boring or repetitive work?", part: "B", category: "Attention", clinicalWeight: 0.85 },
  { id: 9, text: "How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?", part: "B", category: "Attention", clinicalWeight: 0.78 },
  { id: 10, text: "How often do you misplace or have difficulty finding things at home or at work?", part: "B", category: "Executive Function", clinicalWeight: 0.65 },
  { id: 11, text: "How often are you distracted by activity or noise around you?", part: "B", category: "Attention", clinicalWeight: 0.72 },
  { id: 12, text: "How often do you leave your seat in meetings or other situations where you are expected to remain seated?", part: "B", category: "Hyperactivity", clinicalWeight: 0.68 },
  { id: 13, text: "How often do you feel restless or fidgety?", part: "B", category: "Hyperactivity", clinicalWeight: 0.70 },
  { id: 14, text: "How often do you have difficulty unwinding and relaxing when you have time to yourself?", part: "B", category: "Hyperactivity", clinicalWeight: 0.65 },
  { id: 15, text: "How often do you find yourself talking too much when you are in social situations?", part: "B", category: "Impulsivity", clinicalWeight: 0.60 },
  { id: 16, text: "When you're in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?", part: "B", category: "Impulsivity", clinicalWeight: 0.75 },
  { id: 17, text: "How often do you have difficulty waiting your turn in situations when turn taking is required?", part: "B", category: "Impulsivity", clinicalWeight: 0.73 },
  { id: 18, text: "How often do you interrupt others when they are busy?", part: "B", category: "Impulsivity", clinicalWeight: 0.70 }
];

// Enhanced Clinical Analytics
class ClinicalAnalytics {
  constructor(patientData) {
    this.data = patientData;
  }

  calculateTreatmentResponse() {
    const assessments = this.data.assessments?.sort((a, b) => new Date(a.date) - new Date(b.date)) || [];
    
    if (assessments.length < 2) return null;

    const baseline = assessments[0];
    const latest = assessments[assessments.length - 1];
    
    const timeframe = Math.ceil((new Date(latest.date) - new Date(baseline.date)) / (1000 * 60 * 60 * 24));
    
    let improvement = 0;
    let effectSize = 0;
    
    if (baseline.type === latest.type) {
      const baselineScore = baseline.scores.totalScore || baseline.scores.score;
      const latestScore = latest.scores.totalScore || latest.scores.score;
      improvement = ((baselineScore - latestScore) / baselineScore) * 100;
      
      // Calculate Cohen's d effect size
      const pooledSD = this.calculatePooledSD(assessments);
      effectSize = (baselineScore - latestScore) / pooledSD;
    }

    return {
      timeframe,
      improvement: improvement.toFixed(1),
      effectSize: effectSize.toFixed(2),
      clinicalSignificance: Math.abs(effectSize) > 0.5,
      reliableChange: Math.abs(improvement) > 10,
      trend: improvement > 0 ? 'Improving' : improvement < 0 ? 'Declining' : 'Stable'
    };
  }

  assessRiskLevel() {
    const latestAssessment = this.getLatestAssessment();
    const recentDiary = this.getRecentDiaryEntries(7);
    
    let riskScore = 0;
    const riskFactors = [];

    if (latestAssessment) {
      if (latestAssessment.type === 'asrs' && latestAssessment.scores.totalScore > 54) {
        riskScore += 3;
        riskFactors.push('Severe ADHD symptoms');
      }
      
      if (latestAssessment.type === 'aq' && latestAssessment.scores.score > 40) {
        riskScore += 2;
        riskFactors.push('High autism traits');
      }
      
      if (latestAssessment.type === 'catq' && latestAssessment.scores.totalScore > 6) {
        riskScore += 3;
        riskFactors.push('High masking/burnout risk');
      }
    }

    if (recentDiary.length > 0) {
      const avgMood = recentDiary.reduce((sum, entry) => sum + entry.mood, 0) / recentDiary.length;
      const avgAnxiety = recentDiary.reduce((sum, entry) => sum + (entry.anxiety || 5), 0) / recentDiary.length;
      
      if (avgMood < 3) {
        riskScore += 4;
        riskFactors.push('Persistent low mood');
      }
      
      if (avgAnxiety > 8) {
        riskScore += 3;
        riskFactors.push('High anxiety levels');
      }

      const adherenceRate = recentDiary.filter(entry => entry.medicationTaken).length / recentDiary.length;
      if (adherenceRate < 0.7) {
        riskScore += 2;
        riskFactors.push('Poor medication adherence');
      }
    }

    return {
      score: riskScore,
      level: riskScore >= 8 ? 'High' : riskScore >= 4 ? 'Medium' : 'Low',
      factors: riskFactors,
      recommendations: this.generateRiskRecommendations(riskScore, riskFactors)
    };
  }

  analyzeFunctionalImprovement() {
    const entries = this.data.diaryEntries?.filter(entry => entry.workProductivity !== undefined).sort((a, b) => new Date(a.date) - new Date(b.date)) || [];

    if (entries.length < 10) return null;

    const baseline = entries.slice(0, 5);
    const recent = entries.slice(-5);

    const domains = ['workProductivity', 'socialComfort', 'sleepQuality', 'focus'];
    const improvements = {};

    domains.forEach(domain => {
      const baselineAvg = baseline.reduce((sum, entry) => sum + (entry[domain] || 0), 0) / baseline.length;
      const recentAvg = recent.reduce((sum, entry) => sum + (entry[domain] || 0), 0) / recent.length;
      
      improvements[domain] = {
        baseline: baselineAvg.toFixed(1),
        current: recentAvg.toFixed(1),
        change: (recentAvg - baselineAvg).toFixed(1),
        percentChange: (((recentAvg - baselineAvg) / baselineAvg) * 100).toFixed(1)
      };
    });

    return improvements;
  }

  getLatestAssessment() {
    if (!this.data.assessments || this.data.assessments.length === 0) return null;
    return this.data.assessments.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  }

  getRecentDiaryEntries(days) {
    if (!this.data.diaryEntries) return [];
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return this.data.diaryEntries.filter(entry => new Date(entry.date) >= cutoffDate);
  }

  calculatePooledSD(assessments) {
    // Simplified pooled standard deviation calculation
    return 5; // Placeholder - would be calculated from normative data
  }

  generateRiskRecommendations(score, factors) {
    const recommendations = [];
    
    if (score >= 8) {
      recommendations.push('Consider increasing monitoring frequency');
      recommendations.push('Evaluate need for immediate intervention');
      recommendations.push('Assess safety concerns');
    }
    
    if (factors.includes('Poor medication adherence')) {
      recommendations.push('Review medication regimen and adherence barriers');
    }
    
    if (factors.includes('Persistent low mood')) {
      recommendations.push('Screen for depression and suicidal ideation');
    }

    return recommendations;
  }
}

// Main Enhanced Application
const EnhancedClinicalPlatform = () => {
  // Core State
  const [userRole, setUserRole] = useState('patient'); // 'patient', 'provider', 'admin'
  const [currentView, setCurrentView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPatient, setCurrentPatient] = useState(null);
  
  // Assessment State
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  
  // Data State
  const [patients, setPatients] = useState([]);
  const [assessmentHistory, setAssessmentHistory] = useState([]);
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [clinicalNotes, setClinicalNotes] = useState([]);
  
  // UI State
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    largeText: false,
    oneQuestionPerPage: true,
    reducedMotion: false
  });

  // Sample data for demonstration
  useEffect(() => {
    // Initialize with sample patient data for demo
    const samplePatients = [
      {
        id: 'pt001',
        mrn: 'MRN001234',
        demographics: {
          name: 'Sarah Johnson',
          dob: '1995-03-15',
          gender: 'Female',
          ethnicity: 'Caucasian',
          primaryLanguage: 'English'
        },
        clinicalInfo: {
          primaryDiagnoses: ['ADHD', 'Anxiety Disorder'],
          medications: ['Adderall XR 20mg', 'Sertraline 50mg'],
          referringProvider: 'Dr. Smith'
        },
        lastAssessment: '2024-01-15',
        riskLevel: 'Medium',
        nextAppointment: '2024-02-01'
      },
      {
        id: 'pt002',
        mrn: 'MRN001235',
        demographics: {
          name: 'Michael Chen',
          dob: '1988-07-22',
          gender: 'Male',
          ethnicity: 'Asian',
          primaryLanguage: 'English'
        },
        clinicalInfo: {
          primaryDiagnoses: ['Autism Spectrum Disorder'],
          medications: ['Risperidone 1mg'],
          referringProvider: 'Dr. Williams'
        },
        lastAssessment: '2024-01-10',
        riskLevel: 'Low',
        nextAppointment: '2024-02-15'
      }
    ];
    
    setPatients(samplePatients);
  }, []);

  // Authentication Component
  const LoginPage = () => {
    const [loginForm, setLoginForm] = useState({
      username: '',
      password: '',
      role: 'provider'
    });

    const handleLogin = () => {
      // Simulate authentication
      const user = {
        id: 'user001',
        name: loginForm.role === 'provider' ? 'Dr. Emily Rodriguez' : 'Sarah Johnson',
        role: loginForm.role,
        credentials: loginForm.role === 'provider' ? 'MD, Psychiatrist' : 'Patient',
        department: loginForm.role === 'provider' ? 'Psychiatry' : null,
        license: loginForm.role === 'provider' ? 'MD123456' : null
      };
      
      setCurrentUser(user);
      setUserRole(loginForm.role);
      setCurrentView(loginForm.role === 'provider' ? 'providerDashboard' : 'patientDashboard');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Brain className="h-12 w-12 text-blue-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Clinical Platform</h1>
            </div>
            <p className="text-gray-600">Neurodivergent Assessment & Management</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Login As</label>
              <select
                value={loginForm.role}
                onChange={(e) => setLoginForm({...loginForm, role: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="provider">Healthcare Provider</option>
                <option value="patient">Patient</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Sign In
            </button>

            <div className="text-center text-sm text-gray-500">
              <p>Demo credentials: any username/password</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Provider Dashboard
  const ProviderDashboard = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [dashboardView, setDashboardView] = useState('overview');

    const PatientCard = ({ patient }) => (
      <div 
        className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
          selectedPatient?.id === patient.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
        }`}
        onClick={() => setSelectedPatient(patient)}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{patient.demographics.name}</h3>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            patient.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
            patient.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {patient.riskLevel} Risk
          </span>
        </div>
        
        <div className="text-sm text-gray-600 space-y-1">
          <p>MRN: {patient.mrn}</p>
          <p>DOB: {patient.demographics.dob}</p>
          <p>Last Assessment: {patient.lastAssessment}</p>
          <p>Next Appointment: {patient.nextAppointment}</p>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {patient.clinicalInfo.primaryDiagnoses.map(diagnosis => (
            <span key={diagnosis} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {diagnosis}
            </span>
          ))}
        </div>
      </div>
    );

    const PatientDetailView = () => {
      if (!selectedPatient) {
        return (
          <div className="text-center py-12">
            <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-600">Select a patient to view details</p>
          </div>
        );
      }

      return (
        <div className="space-y-6">
          {/* Patient Header */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedPatient.demographics.name}</h2>
                <p className="text-gray-600">MRN: {selectedPatient.mrn}</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>New Assessment</span>
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center space-x-2">
                  <Edit3 className="h-4 w-4" />
                  <span>Add Note</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Demographics</h4>
                <div className="text-sm space-y-1">
                  <p>Age: {new Date().getFullYear() - new Date(selectedPatient.demographics.dob).getFullYear()}</p>
                  <p>Gender: {selectedPatient.demographics.gender}</p>
                  <p>Language: {selectedPatient.demographics.primaryLanguage}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Clinical Info</h4>
                <div className="text-sm space-y-1">
                  <p>Provider: {selectedPatient.clinicalInfo.referringProvider}</p>
                  <p>Diagnoses: {selectedPatient.clinicalInfo.primaryDiagnoses.join(', ')}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Current Status</h4>
                <div className="text-sm space-y-1">
                  <p>Risk Level: <span className={`font-medium ${
                    selectedPatient.riskLevel === 'High' ? 'text-red-600' :
                    selectedPatient.riskLevel === 'Medium' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>{selectedPatient.riskLevel}</span></p>
                  <p>Next Appointment: {selectedPatient.nextAppointment}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Charts and Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4">Assessment Trends</h3>
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                  <p>Assessment data visualization</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4">Functional Outcomes</h3>
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                  <p>Functional improvement tracking</p>
                </div>
              </div>
            </div>
          </div>

          {/* Medications and Treatment */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold mb-4">Current Medications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedPatient.clinicalInfo.medications.map((medication, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Pill className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">{medication}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Active prescription</p>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Notes */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold mb-4">Recent Clinical Notes</h3>
            <div className="space-y-3">
              <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">Initial Assessment</span>
                  <span className="text-sm text-gray-500">2024-01-15</span>
                </div>
                <p className="text-sm">Patient presents with symptoms consistent with ADHD. Initiated treatment plan with medication and behavioral interventions.</p>
              </div>
              
              <div className="p-3 border-l-4 border-green-500 bg-green-50">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">Progress Note</span>
                  <span className="text-sm text-gray-500">2024-01-08</span>
                </div>
                <p className="text-sm">Patient showing improvement in attention and executive function. Continue current medication regimen.</p>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Clinical Dashboard</h1>
              <p className="text-gray-600">Welcome back, {currentUser.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>HIPAA Compliant</span>
              </div>
              <button
                onClick={() => setCurrentView('login')}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold">{patients.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">High Risk</p>
                  <p className="text-2xl font-bold">{patients.filter(p => p.riskLevel === 'High').length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3">
                <Calendar className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3">
                <Activity className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Patient List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4">Patient List</h3>
                <div className="space-y-3">
                  {patients.map(patient => (
                    <PatientCard key={patient.id} patient={patient} />
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <PatientDetailView />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Patient Dashboard (Enhanced)
  const PatientDashboard = () => {
    const [patientView, setPatientView] = useState('overview');
    
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">My Health Dashboard</h1>
              <p className="text-gray-600">Welcome back, {currentUser.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Lock className="h-4 w-4" />
                <span>Secure Connection</span>
              </div>
              <button
                onClick={() => setCurrentView('login')}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <button className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-left">
              <Brain className="h-6 w-6 mb-2" />
              <h3 className="font-medium">Take Assessment</h3>
              <p className="text-sm opacity-90">Start new evaluation</p>
            </button>
            
            <button className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 text-left">
              <Edit3 className="h-6 w-6 mb-2" />
              <h3 className="font-medium">Daily Check-in</h3>
              <p className="text-sm opacity-90">Log symptoms & mood</p>
            </button>
            
            <button className="p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-left">
              <TrendingUp className="h-6 w-6 mb-2" />
              <h3 className="font-medium">View Progress</h3>
              <p className="text-sm opacity-90">Track improvements</p>
            </button>
            
            <button className="p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-left">
              <Calendar className="h-6 w-6 mb-2" />
              <h3 className="font-medium">Appointments</h3>
              <p className="text-sm opacity-90">Manage schedule</p>
            </button>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Overview */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Brain className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">ADHD Assessment Completed</p>
                      <p className="text-sm text-gray-600">January 15, 2024</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <Edit3 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Daily Check-in Complete</p>
                      <p className="text-sm text-gray-600">Today, 9:30 AM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-4">Progress Overview</h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                    <p>Your progress visualization will appear here</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-4">Next Appointment</h3>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Calendar className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <p className="font-medium">Dr. Rodriguez</p>
                  <p className="text-sm text-gray-600">February 1, 2024</p>
                  <p className="text-sm text-gray-600">2:00 PM</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-4">Current Medications</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <Pill className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Adderall XR 20mg</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <Pill className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Sertraline 50mg</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-4">Care Team</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Stethoscope className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-sm">Dr. Emily Rodriguez</p>
                      <p className="text-xs text-gray-600">Psychiatrist</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <UserCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-sm">Sarah Wilson</p>
                      <p className="text-xs text-gray-600">Therapist</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Clinical Reports Component
  const ClinicalReports = () => {
    const generateHL7Report = () => {
      const hl7Data = {
        resourceType: "Bundle",
        id: `patient-${currentPatient?.id || 'demo'}`,
        type: "document",
        timestamp: new Date().toISOString(),
        entry: [
          {
            resource: {
              resourceType: "Patient",
              id: currentPatient?.id || 'demo',
              identifier: [{
                system: "http://hospital.example.org",
                value: currentPatient?.mrn || 'DEMO001'
              }],
              name: [{
                family: currentPatient?.demographics?.name?.split(' ').pop() || 'Demo',
                given: currentPatient?.demographics?.name?.split(' ').slice(0, -1) || ['Patient']
              }],
              gender: currentPatient?.demographics?.gender?.toLowerCase() || 'unknown',
              birthDate: currentPatient?.demographics?.dob || '1990-01-01'
            }
          }
        ]
      };

      const blob = new Blob([JSON.stringify(hl7Data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hl7-fhir-report-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-bold mb-4">Clinical Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={generateHL7Report}
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
          >
            <Database className="h-6 w-6 text-blue-500 mb-2" />
            <h4 className="font-medium">HL7 FHIR Export</h4>
            <p className="text-sm text-gray-600">Export patient data in HL7 FHIR format</p>
          </button>
          
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <Printer className="h-6 w-6 text-green-500 mb-2" />
            <h4 className="font-medium">Clinical Summary</h4>
            <p className="text-sm text-gray-600">Generate comprehensive clinical report</p>
          </button>
          
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <BarChart3 className="h-6 w-6 text-purple-500 mb-2" />
            <h4 className="font-medium">Outcomes Report</h4>
            <p className="text-sm text-gray-600">Treatment response analysis</p>
          </button>
          
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <Shield className="h-6 w-6 text-red-500 mb-2" />
            <h4 className="font-medium">Risk Assessment</h4>
            <p className="text-sm text-gray-600">Current risk stratification</p>
          </button>
        </div>
      </div>
    );
  };

  // Main Render Logic
  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return <LoginPage />;
      case 'providerDashboard':
        return <ProviderDashboard />;
      case 'patientDashboard':
        return <PatientDashboard />;
      default:
        return <LoginPage />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentView()}
      
      {/* Global Security Notice */}
      {currentUser && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Secure Session Active</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedClinicalPlatform;