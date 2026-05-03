export const profile = {
  name: 'Nuttawut Sukaew',
  handle: '@ntwsk',
  role: 'Salesforce Developer',
  company: 'ATA IT',
  headline: 'Salesforce Developer @ ATA IT',
  subheadline: 'Former Accenture & I&I Group Senior Developer',
  location: 'Thailand',
  email: 'ntwsk.tt@gmail.com',
  github: 'https://github.com/ntwsk',
  linkedin: 'https://www.linkedin.com/in/nuttawut-sukaew-478232212/',
  bio: 'Senior Salesforce Developer with 4+ years building CRM solutions across Accenture and I&I Group. Specialist in Apex, Aura, LWC, Marketing Cloud, and Dialogflow CX. Passionate about clean architecture, automated testing, and reliable integrations.',
}

export const skills = [
  { name: 'Apex', category: 'salesforce' },
  { name: 'Aura Component', category: 'salesforce' },
  { name: 'Lightning Web Component', category: 'salesforce' },
  { name: 'Salesforce Flow', category: 'salesforce' },
  { name: 'SOQL / SOSL', category: 'salesforce' },
  { name: 'Marketing Cloud', category: 'salesforce' },
  { name: 'Visualforce', category: 'salesforce' },
  { name: 'Dialogflow CX', category: 'cloud' },
  { name: 'AWS', category: 'cloud' },
  { name: 'GCP / Kibana', category: 'cloud' },
  { name: 'JavaScript', category: 'dev' },
  { name: 'Python', category: 'dev' },
  { name: 'Robot Framework', category: 'dev' },
  { name: 'REST / GraphQL', category: 'dev' },
  { name: 'Git / CI-CD', category: 'dev' },
  { name: 'React', category: 'dev' },
]

export const experience = [
  {
    id: 1,
    company: 'ATA IT',
    role: 'Salesforce Developer',
    period: '2024 – Present',
    type: 'Full-time',
    highlights: [
      'Building Salesforce solutions with Apex, Aura, and LWC',
      'Designing and implementing custom integrations with REST APIs',
      'Collaborating with business analysts to deliver feature requirements',
      'Performing code reviews and maintaining module stability',
    ],
  },
  {
    id: 2,
    company: 'Accenture',
    role: 'Salesforce Developer',
    period: 'Nov 2023 – 2024',
    type: 'Full-time',
    highlights: [
      'Implemented complex change requests and resolved defects ensuring alignment with business requirements',
      'Proactively analyzed impact of changes, reviewed code, and performed unit testing to maintain stability',
      'Collaborated closely with stakeholder teams throughout the development lifecycle',
    ],
  },
  {
    id: 3,
    company: 'I&I Group Public Company Limited',
    role: 'Salesforce Developer & Support Specialist',
    period: 'Jun 2020 – Nov 2023',
    type: 'Full-time',
    highlights: [
      'Designed and implemented custom solutions for Campaign Management and Online Booking using Salesforce development tools',
      'Managed 300+ support tickets as Salesforce Support Specialist — maintained platform integrity and 24/7 on-call reliability',
      'Integrated Salesforce with Marketing Cloud, developed Journey Builder flows and multi-channel automation',
      'Investigated and resolved Thai-language issues in Dialogflow CX for Chat Bot & Voice Bot; monitored via GCP Logger and Kibana',
      'Developed and executed automated test scripts using Robot Framework; ensured seamless third-party integrations',
    ],
  },
]

export const certifications = [
  {
    id: 1,
    name: 'Salesforce Associate',
    issuer: 'Salesforce',
    year: '2023',
    color: '#00a1e0',
    icon: 'layers',
  },
  {
    id: 2,
    name: 'Salesforce Administrator',
    issuer: 'Salesforce',
    year: '2022',
    color: '#00a1e0',
    icon: 'settings',
  },
  {
    id: 3,
    name: 'Salesforce Platform App Builder',
    issuer: 'Salesforce',
    year: '2023',
    color: '#34d36e',
    icon: 'code',
  },
]

export const education = {
  degree: 'B.Sc. Computer Science (Second-Class Honors)',
  university: 'Chiang Mai University',
  period: 'Aug 2016 – May 2020',
  location: 'Chiang Mai, Thailand',
}

export const stages = [
  { id: 'hero',           num: 1, codename: 'PROFILE',   xp: 500,  desc: 'Identify the operator' },
  { id: 'about',          num: 2, codename: 'ORIGINS',   xp: 700,  desc: 'Read background lore' },
  { id: 'skills',         num: 3, codename: 'ARSENAL',   xp: 1200, desc: 'Inventory unlocked tools' },
  { id: 'experience',     num: 4, codename: 'QUESTS',    xp: 2400, desc: 'Mission history' },
  { id: 'certifications', num: 5, codename: 'TROPHIES',  xp: 1800, desc: 'Earned achievements' },
  { id: 'contact',        num: 6, codename: 'BOSS',      xp: 1800, desc: 'Initiate contact protocol' },
]

export const aboutJson = {
  name: 'Nuttawut Sukaew',
  handle: 'ntwsk',
  role: 'Salesforce Developer',
  currentCompany: 'ATA IT',
  previousCompanies: ['Accenture', 'I&I Group Public Company Limited'],
  skills: ['Apex', 'Aura Component', 'LWC', 'Salesforce Flow', 'Marketing Cloud', 'Dialogflow CX'],
  certifications: ['SF Associate', 'SF Administrator', 'SF Platform App Builder'],
  education: { degree: 'B.Sc. Computer Science', university: 'Chiang Mai University', year: 2020 },
  openToWork: false,
  remote: true,
  location: 'Thailand',
}
