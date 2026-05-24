import React, { useState } from 'react';
import { Download, Save, Upload, AlertCircle, CheckCircle, Info, TrendingUp, Users, Building2, FileText, Mail, Phone, BarChart3, PieChart } from 'lucide-react';

const SENDDiagnosticTool = () => {
  const [diagnosticLevel, setDiagnosticLevel] = useState('executive');
  const [assessmentData, setAssessmentData] = useState({});
  const [currentSection, setCurrentSection] = useState('overview');
  const [trustDetails, setTrustDetails] = useState({
    trustName: '',
    trustType: '',
    numberOfSchools: '',
    ceo: '',
    sendDirector: '',
    assessor: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [schoolDetails, setSchoolDetails] = useState({
    schoolName: '',
    phase: '',
    numberOfPupils: '',
    sendPercentage: '',
    headteacher: '',
    sendco: ''
  });

  const executiveCategories = {
    strategy: {
      title: "SEND and Inclusion Strategy",
      icon: "🎯",
      description: "Strategic leadership and vision for SEND across the Trust",
      focusAreas: [
        "The Trust has a clearly articulated SEND and Inclusion Strategy aligned with the SEND Code of Practice",
        "The strategy includes measurable objectives and success criteria for SEND provision",
        "Leadership demonstrates commitment to inclusive practice through resource allocation",
        "The strategy is regularly reviewed and updated based on impact data"
      ]
    },
    governance: {
      title: "Governance and Accountability",
      icon: "⚖️",
      description: "Oversight and accountability structures for SEND provision",
      focusAreas: [
        "The Trust Board includes a designated SEND trustee/governor",
        "Regular SEND monitoring reports are provided to governance level",
        "There is clear accountability for SEND outcomes at all leadership levels",
        "Governance structures ensure compliance with statutory SEND duties"
      ]
    },
    resourceAllocation: {
      title: "Resource Allocation and Financial Management",
      icon: "💰",
      description: "Strategic deployment of resources to support SEND",
      focusAreas: [
        "SEND funding is strategically allocated based on need across the Trust",
        "There is transparent tracking of SEND expenditure and impact",
        "The Trust has processes to ensure value for money in SEND provision",
        "Resources are regularly reviewed against outcomes for SEND pupils"
      ]
    },
    workforce: {
      title: "Workforce Development and Capacity",
      icon: "👥",
      description: "Building expertise and capacity across the Trust",
      focusAreas: [
        "The Trust has a strategic approach to SEND professional development",
        "There is adequate SEND specialist capacity across schools",
        "Staff wellbeing in relation to SEND workload is monitored and supported",
        "The Trust attracts and retains high-quality SEND practitioners"
      ]
    },
    partnerships: {
      title: "Partnership and Stakeholder Engagement",
      icon: "🤝",
      description: "Collaboration with families, external agencies and community",
      focusAreas: [
        "The Trust has established partnerships with key external SEND services",
        "Parent/carer voice actively shapes SEND provision at Trust level",
        "There are effective processes for multi-agency working",
        "The Trust engages with local SEND networks and best practice forums"
      ]
    },
    qualityAssurance: {
      title: "Quality Assurance and Improvement",
      icon: "📊",
      description: "Monitoring, evaluation and continuous improvement systems",
      focusAreas: [
        "The Trust has robust systems for monitoring SEND provision quality",
        "Data is used strategically to drive SEND improvement across schools",
        "There are clear escalation procedures for schools requiring SEND support",
        "Regular Trust-wide SEND audits inform improvement planning"
      ]
    },
    compliance: {
      title: "Statutory Compliance and Legal Duties",
      icon: "📋",
      description: "Meeting legal requirements and statutory obligations",
      focusAreas: [
        "All Trust schools comply with the SEND Code of Practice requirements",
        "EHCP processes meet statutory timescales across all schools",
        "The Trust has systems to ensure Equality Act compliance",
        "SEND information reports are compliant and published as required"
      ]
    },
    innovation: {
      title: "Innovation and Best Practice",
      icon: "💡",
      description: "Leading edge practice and continuous learning",
      focusAreas: [
        "The Trust actively researches and implements evidence-based SEND approaches",
        "There are mechanisms for sharing effective SEND practice across schools",
        "The Trust contributes to wider sector knowledge and best practice",
        "Innovation in SEND practice is encouraged and supported strategically"
      ]
    }
  };

  const schoolCategories = {
    identification: {
      title: "Early Identification and Assessment",
      icon: "🔍",
      description: "Systems for identifying and assessing SEND",
      eldAlignment: "qualityAssurance",
      focusAreas: [
        "The school has clear processes for early identification of SEND",
        "Assessment arrangements are appropriate for pupils with SEND",
        "The SEND register is accurate and regularly updated",
        "Progress tracking systems effectively identify pupils not making expected progress",
        "Baseline assessments inform appropriate support planning",
        "Staff are trained to recognise indicators of different SEND needs"
      ]
    },
    provision: {
      title: "Quality of SEND Provision",
      icon: "⭐",
      description: "Effectiveness of support and interventions",
      eldAlignment: "qualityAssurance",
      focusAreas: [
        "Interventions are evidence-based and matched to identified needs",
        "Support is delivered by appropriately trained staff",
        "The graduated approach is consistently applied across the school",
        "Provision is regularly evaluated for impact and adjusted accordingly",
        "Pupils with SEND access high-quality Wave 1 teaching",
        "Additional support enhances rather than replaces core teaching"
      ]
    },
    curriculum: {
      title: "Curriculum, Pedagogy and Classroom Culture",
      icon: "📚",
      description: "An inclusive curriculum accessible to all pupils",
      eldAlignment: "strategy",
      focusAreas: [
        "The curriculum is ambitious and accessible for pupils with SEND",
        "Teaching strategies are adapted to meet diverse learning needs",
        "Resources and materials are differentiated appropriately",
        "The learning environment promotes inclusion and belonging",
        "Pupils with SEND have access to the full breadth of the curriculum",
        "Cultural capital is actively developed for all pupils including those with SEND"
      ]
    },
    planning: {
      title: "Assessment, Planning and Review",
      icon: "📝",
      description: "Systematic approaches to support planning and review",
      eldAlignment: "strategy",
      focusAreas: [
        "SEND support plans are person-centred and outcome-focused",
        "Parents and pupils contribute meaningfully to planning and review",
        "Reviews take place at least termly and inform next steps",
        "Arrangements for statutory reviews (EHCPs) meet requirements",
        "Planning is based on assessment information and addresses identified needs",
        "Progress towards outcomes is measured and recorded systematically"
      ]
    },
    sendco: {
      title: "SENDCO Leadership and Capacity",
      icon: "🎓",
      description: "SENDCO role, time and strategic influence",
      eldAlignment: "workforce",
      focusAreas: [
        "The SENDCO has sufficient time to fulfil the role strategically",
        "The SENDCO holds appropriate National Award qualification",
        "The SENDCO is part of school senior leadership team",
        "The SENDCO has effective oversight of provision and outcomes",
        "There is adequate administrative support for SEND coordination",
        "The SENDCO receives appropriate CPD and professional supervision"
      ]
    },
    staffing: {
      title: "Staff Knowledge and Skills",
      icon: "👨‍🏫",
      description: "Building staff expertise and confidence",
      eldAlignment: "workforce",
      focusAreas: [
        "All staff receive regular high-quality SEND training",
        "Training is matched to the SEND profile of the school",
        "Teaching assistants are deployed effectively to support learning",
        "Staff feel confident in meeting the needs of pupils with SEND",
        "There is access to specialist advice when needed",
        "SEND expertise is developed across the whole staff team"
      ]
    },
    parental: {
      title: "Parental Engagement and Partnership",
      icon: "👨‍👩‍👧",
      description: "Working effectively with families",
      eldAlignment: "partnerships",
      focusAreas: [
        "Parents/carers are involved as partners in their child's education",
        "Communication with families about SEND is clear and regular",
        "The school actively seeks and values parental views",
        "There are effective processes for resolving concerns or disagreements",
        "Parents understand the support their child receives and its impact",
        "The school provides information and signposting to external support"
      ]
    },
    multiAgency: {
      title: "Multi-Agency Working",
      icon: "🔗",
      description: "Collaboration with external professionals and services",
      eldAlignment: "partnerships",
      focusAreas: [
        "The school works effectively with external SEND professionals",
        "Referral processes to external agencies are timely and appropriate",
        "Advice from specialists is implemented and impact is monitored",
        "There are effective arrangements for information sharing",
        "The school contributes to Early Help and multi-agency meetings",
        "Health and care professionals are involved where appropriate"
      ]
    },
    transitions: {
      title: "Transitions and Progression",
      icon: "➡️",
      description: "Supporting pupils through key transition points",
      eldAlignment: "qualityAssurance",
      focusAreas: [
        "Transition arrangements for pupils with SEND are carefully planned",
        "Information about SEND is transferred effectively between settings",
        "Additional transition support is provided based on individual need",
        "Post-16 transitions are supported with appropriate guidance",
        "Pupils and parents are involved in transition planning",
        "The impact of transition support is evaluated and improved"
      ]
    },
    safeguarding: {
      title: "Safeguarding and Wellbeing",
      icon: "🛡️",
      description: "Ensuring pupils with SEND are safe and supported",
      eldAlignment: "compliance",
      focusAreas: [
        "Staff understand increased safeguarding vulnerabilities for SEND pupils",
        "Safeguarding systems are accessible for pupils with communication needs",
        "Mental health and wellbeing support is available and effective",
        "Behaviour support approaches are appropriate and trauma-informed",
        "Pupils with SEND report feeling safe and supported",
        "The school monitors attendance and welfare of vulnerable pupils"
      ]
    },
    compliance: {
      title: "Statutory Duties and Accountability",
      icon: "📋",
      description: "Meeting legal requirements and publishing information",
      eldAlignment: "compliance",
      focusAreas: [
        "The school meets its duties under the SEND Code of Practice",
        "The SEND Information Report is published and kept up to date",
        "EHCP arrangements comply with statutory requirements",
        "The school meets its duties under the Equality Act 2010",
        "Required data returns about SEND are accurate and timely",
        "Governance has effective oversight of SEND statutory compliance"
      ]
    }
  };

  const updateAssessment = (category, focusArea, value) => {
    setAssessmentData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [focusArea]: value
      }
    }));
  };

  const updateTrustDetails = (field, value) => {
    setTrustDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateSchoolDetails = (field, value) => {
    setSchoolDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateCompliance = () => {
    const categories = diagnosticLevel === 'executive' ? executiveCategories : schoolCategories;
    let totalQuestions = 0;
    let yesAnswers = 0;

    Object.keys(categories).forEach(categoryKey => {
      const category = categories[categoryKey];
      const categoryData = assessmentData[categoryKey] || {};

      category.focusAreas.forEach((_, index) => {
        totalQuestions++;
        if (categoryData[index] === 'yes') {
          yesAnswers++;
        }
      });
    });

    return totalQuestions > 0 ? Math.round((yesAnswers / totalQuestions) * 100) : 0;
  };

  const getCategoryCompliance = (categoryKey) => {
    const categories = diagnosticLevel === 'executive' ? executiveCategories : schoolCategories;
    const category = categories[categoryKey];
    const categoryData = assessmentData[categoryKey] || {};

    let total = category.focusAreas.length;
    let yes = 0;

    category.focusAreas.forEach((_, index) => {
      if (categoryData[index] === 'yes') {
        yes++;
      }
    });

    return total > 0 ? Math.round((yes / total) * 100) : 0;
  };

  const getCompletionPercentage = () => {
    const categories = diagnosticLevel === 'executive' ? executiveCategories : schoolCategories;
    let totalQuestions = 0;
    let answeredQuestions = 0;

    Object.keys(categories).forEach(categoryKey => {
      const category = categories[categoryKey];
      const categoryData = assessmentData[categoryKey] || {};

      category.focusAreas.forEach((_, index) => {
        totalQuestions++;
        if (categoryData[index] !== undefined) {
          answeredQuestions++;
        }
      });
    });

    return totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;
  };

  const DetailsForm = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6" data-testid="details-form">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          {diagnosticLevel === 'executive' ? 'Trust Information' : 'School Information'}
        </h3>
        <div className="flex gap-2">
          <button
            data-testid="select-executive-level"
            onClick={() => setDiagnosticLevel('executive')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              diagnosticLevel === 'executive'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Executive Level (ELD)
          </button>
          <button
            data-testid="select-school-level"
            onClick={() => setDiagnosticLevel('school')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              diagnosticLevel === 'school'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            School Level (SLD)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trust Name</label>
          <input
            data-testid="input-trust-name"
            type="text"
            value={trustDetails.trustName}
            onChange={(e) => updateTrustDetails('trustName', e.target.value)}
            placeholder="Enter trust name"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {diagnosticLevel === 'executive' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trust Type</label>
              <select
                data-testid="select-trust-type"
                value={trustDetails.trustType}
                onChange={(e) => updateTrustDetails('trustType', e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select type</option>
                <option value="Multi-Academy Trust">Multi-Academy Trust</option>
                <option value="Single Academy Trust">Single Academy Trust</option>
                <option value="Federation">Federation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Schools</label>
              <input
                data-testid="input-number-of-schools"
                type="number"
                value={trustDetails.numberOfSchools}
                onChange={(e) => updateTrustDetails('numberOfSchools', e.target.value)}
                placeholder="Number of schools"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CEO</label>
              <input
                data-testid="input-ceo"
                type="text"
                value={trustDetails.ceo}
                onChange={(e) => updateTrustDetails('ceo', e.target.value)}
                placeholder="CEO name"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SEND Director</label>
              <input
                data-testid="input-send-director"
                type="text"
                value={trustDetails.sendDirector}
                onChange={(e) => updateTrustDetails('sendDirector', e.target.value)}
                placeholder="SEND Director name"
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
              <input
                data-testid="input-school-name"
                type="text"
                value={schoolDetails.schoolName}
                onChange={(e) => updateSchoolDetails('schoolName', e.target.value)}
                placeholder="Enter school name"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
              <select
                data-testid="select-phase"
                value={schoolDetails.phase}
                onChange={(e) => updateSchoolDetails('phase', e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select phase</option>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
                <option value="All-through">All-through</option>
                <option value="Special">Special</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Pupils</label>
              <input
                data-testid="input-number-of-pupils"
                type="number"
                value={schoolDetails.numberOfPupils}
                onChange={(e) => updateSchoolDetails('numberOfPupils', e.target.value)}
                placeholder="Number of pupils on roll"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SEND %</label>
              <input
                data-testid="input-send-percentage"
                type="number"
                value={schoolDetails.sendPercentage}
                onChange={(e) => updateSchoolDetails('sendPercentage', e.target.value)}
                placeholder="Percentage of pupils with SEND"
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );

  const OverviewDashboard = () => {
    const compliance = calculateCompliance();
    const completion = getCompletionPercentage();
    const categories = diagnosticLevel === 'executive' ? executiveCategories : schoolCategories;
    const totalCategories = Object.keys(categories).length;

    return (
      <div className="space-y-6" data-testid="overview-dashboard">
        <DetailsForm />

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">SEND Diagnostic Dashboard</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Powered by</span>
              <span className="font-bold text-blue-600">Supporting Education Group</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
              <h3 className="font-semibold text-sm">Completion</h3>
              <p className="text-3xl font-bold" data-testid="metric-completion">{completion}%</p>
              <p className="text-xs opacity-75">Questions answered</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
              <h3 className="font-semibold text-sm">Compliance Score</h3>
              <p className="text-3xl font-bold" data-testid="metric-compliance">{compliance}%</p>
              <p className="text-xs opacity-75">Overall compliance</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
              <h3 className="font-semibold text-sm">Diagnostic Level</h3>
              <p className="text-2xl font-bold">{diagnosticLevel === 'executive' ? 'ELD' : 'SLD'}</p>
              <p className="text-xs opacity-75">{totalCategories} categories</p>
            </div>
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 rounded-lg text-white">
              <h3 className="font-semibold text-sm">Framework</h3>
              <p className="text-xl font-bold">SEND 2015</p>
              <p className="text-xs opacity-75">+ Ofsted 2025</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-3">Category Compliance</h3>
          <div className="space-y-3">
            {Object.entries(categories).map(([key, category]) => {
              const score = getCategoryCompliance(key);
              const status = score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-blue-500' : score >= 40 ? 'bg-amber-500' : 'bg-red-500';

              return (
                <div key={key} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <h4 className="font-medium">{category.title}</h4>
                        <p className="text-xs text-gray-500">{category.description}</p>
                        {diagnosticLevel === 'school' && category.eldAlignment && (
                          <p className="text-xs text-blue-600 mt-1">
                            ⚡ Aligned with ELD: {executiveCategories[category.eldAlignment]?.title}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-2 rounded-full text-white font-bold ${status}`}>
                        {score}%
                      </span>
                      <button
                        data-testid={`assess-${key}`}
                        onClick={() => setCurrentSection(key)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 border border-blue-600 rounded hover:bg-blue-50"
                      >
                        Assess
                      </button>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${status}`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">MAT SEND Proposition</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <TrendingUp size={24} />
              <div>
                <h4 className="font-medium">Diagnostic Gateway</h4>
                <p className="text-sm opacity-90">Entry to comprehensive SEND support</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users size={24} />
              <div>
                <h4 className="font-medium">Expert Consultancy</h4>
                <p className="text-sm opacity-90">Strategic and operational support</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Building2 size={24} />
              <div>
                <h4 className="font-medium">Co-Sell Services</h4>
                <p className="text-sm opacity-90">Integrated SEND services across SEG</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AssessmentSection = ({ categoryKey, category }) => {
    const categoryData = assessmentData[categoryKey] || {};

    return (
      <div className="space-y-6" data-testid={`assessment-section-${categoryKey}`}>
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{category.icon}</span>
            <div>
              <h2 className="text-2xl font-bold">{category.title}</h2>
              <p className="text-gray-600">{category.description}</p>
              {diagnosticLevel === 'school' && category.eldAlignment && (
                <p className="text-sm text-blue-600 mt-1">
                  ⚡ Aligned with ELD: {executiveCategories[category.eldAlignment]?.title}
                </p>
              )}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-blue-800">
              <strong>Assessment Method:</strong> For each focus area, indicate whether your {diagnosticLevel === 'executive' ? 'Trust' : 'school'} currently meets this standard.
            </p>
          </div>

          <div className="space-y-4">
            {category.focusAreas.map((focusArea, index) => {
              const response = categoryData[index];

              return (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-3">{focusArea}</p>
                      <div className="flex gap-3">
                        <button
                          data-testid={`answer-yes-${categoryKey}-${index}`}
                          onClick={() => updateAssessment(categoryKey, index, 'yes')}
                          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                            response === 'yes'
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          ✓ Yes
                        </button>
                        <button
                          data-testid={`answer-no-${categoryKey}-${index}`}
                          onClick={() => updateAssessment(categoryKey, index, 'no')}
                          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                            response === 'no'
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          ✗ No
                        </button>
                        {response && (
                          <button
                            data-testid={`answer-clear-${categoryKey}-${index}`}
                            onClick={() => updateAssessment(categoryKey, index, undefined)}
                            className="px-4 py-2 rounded-lg text-sm text-gray-500 hover:text-gray-700"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>
                    {response && (
                      <div className={`text-3xl ${response === 'yes' ? 'text-green-500' : 'text-red-500'}`}>
                        {response === 'yes' ? '✓' : '✗'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
            <h4 className="font-semibold text-amber-800 mb-2">Progress: {getCategoryCompliance(categoryKey)}%</h4>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-amber-500 to-green-500 h-3 rounded-full transition-all"
                style={{ width: `${getCategoryCompliance(categoryKey)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const categories = diagnosticLevel === 'executive' ? executiveCategories : schoolCategories;

  return (
    <div className="min-h-screen bg-gray-50" data-testid="send-diagnostic-tool">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                SEND Diagnostic Tool
              </h1>
              <p className="text-sm text-gray-500">
                MAT Proposition Gateway | Supporting Education Group
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-blue-600">SEND Code of Practice 2015</div>
              <div className="text-xs text-gray-500">+ Ofsted Framework 2025</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <h3 className="font-semibold mb-4">Navigation</h3>
              <nav className="space-y-2">
                <button
                  data-testid="nav-overview"
                  onClick={() => setCurrentSection('overview')}
                  className={`w-full text-left p-2 rounded-lg flex items-center gap-2 ${
                    currentSection === 'overview' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <span>📊</span>
                  <span className="text-sm">Dashboard</span>
                </button>
                {Object.entries(categories).map(([key, category]) => {
                  const score = getCategoryCompliance(key);
                  const status = score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-blue-500' : score >= 40 ? 'bg-amber-500' : 'bg-red-500';

                  return (
                    <button
                      key={key}
                      data-testid={`nav-${key}`}
                      onClick={() => setCurrentSection(key)}
                      className={`w-full text-left p-2 rounded-lg flex items-center justify-between ${
                        currentSection === key ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span className="text-sm">{category.title}</span>
                      </div>
                      {score > 0 && (
                        <span className={`w-2 h-2 rounded-full ${status}`}></span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="flex-1">
            {currentSection === 'overview' ? (
              <OverviewDashboard />
            ) : (
              <AssessmentSection
                categoryKey={currentSection}
                category={categories[currentSection]}
              />
            )}
          </div>
        </div>
      </div>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900">Supporting Education Group</h3>
              <p className="text-sm text-gray-500">Expert SEND consultancy and school improvement</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Mail size={16} />
                <span>info@supportingeducation.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone size={16} />
                <span>0800 123 4567</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SENDDiagnosticTool;
