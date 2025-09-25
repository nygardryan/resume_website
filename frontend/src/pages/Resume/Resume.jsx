import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Container,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Star as StarIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { MainContent, SectionContainer } from '../../styles/globalStyles';

const Resume = () => {
  const handleDownloadResume = () => {
    // Placeholder for resume download functionality
    console.log('Download resume clicked');
  };

  const experience = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Company',
      period: '2022 - Present',
      achievements: [
        'Led development of microservices architecture serving 100K+ users',
        'Improved application performance by 40% through code optimization',
        'Mentored junior developers and established coding standards',
        'Implemented CI/CD pipelines reducing deployment time by 60%'
      ]
    },
    {
      title: 'Full Stack Developer',
      company: 'Startup Inc',
      period: '2020 - 2022',
      achievements: [
        'Built responsive web applications using React and Node.js',
        'Designed and implemented RESTful APIs',
        'Collaborated with UX/UI designers to create intuitive interfaces',
        'Reduced bug reports by 30% through comprehensive testing'
      ]
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency',
      period: '2019 - 2020',
      achievements: [
        'Developed client websites using modern JavaScript frameworks',
        'Optimized web performance and SEO',
        'Worked with cross-functional teams in agile environment',
        'Maintained and updated legacy codebases'
      ]
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Technology',
      year: '2019',
      gpa: '3.8/4.0',
      relevantCourses: [
        'Data Structures and Algorithms',
        'Software Engineering',
        'Database Systems',
        'Web Development',
        'Machine Learning'
      ]
    }
  ];

  const technicalSkills = {
    'Programming Languages': ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'],
    'Frontend Technologies': ['React', 'Vue.js', 'HTML5', 'CSS3', 'Sass', 'Material-UI'],
    'Backend Technologies': ['Node.js', 'Express.js', 'Django', 'Spring Boot', 'REST APIs'],
    'Databases': ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
    'Tools & Technologies': ['Git', 'Docker', 'AWS', 'Jenkins', 'Jest', 'Webpack']
  };

  const certifications = [
    'AWS Certified Solutions Architect',
    'Google Cloud Professional Developer',
    'Certified Kubernetes Administrator',
    'Scrum Master Certification'
  ];

  return (
    <MainContent>
      <Container maxWidth="lg">
        {/* Header Section */}
        <SectionContainer>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Resume
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Software Engineer & Full Stack Developer
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadResume}
              sx={{ mt: 2 }}
            >
              Download PDF Resume
            </Button>
          </Box>
        </SectionContainer>

        {/* Professional Experience */}
        <SectionContainer>
          <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 3 }}>
            <WorkIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
            Professional Experience
          </Typography>
          {experience.map((job, index) => (
            <Card key={index} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  {job.title}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {job.company}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {job.period}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <List>
                  {job.achievements.map((achievement, achIndex) => (
                    <ListItem key={achIndex} sx={{ py: 0.5 }}>
                      <ListItemIcon>
                        <CheckIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={achievement} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          ))}
        </SectionContainer>

        {/* Education */}
        <SectionContainer>
          <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 3 }}>
            <SchoolIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
            Education
          </Typography>
          {education.map((edu, index) => (
            <Card key={index}>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  {edu.degree}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {edu.school}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {edu.year} • GPA: {edu.gpa}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Relevant Coursework:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {edu.relevantCourses.map((course, courseIndex) => (
                    <Typography
                      key={courseIndex}
                      variant="body2"
                      sx={{
                        backgroundColor: 'primary.light',
                        color: 'primary.contrastText',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.8rem'
                      }}
                    >
                      {course}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </SectionContainer>

        {/* Technical Skills */}
        <SectionContainer>
          <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 3 }}>
            <CodeIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
            Technical Skills
          </Typography>
          <Grid container spacing={3}>
            {Object.entries(technicalSkills).map(([category, skills]) => (
              <Grid item xs={12} md={6} key={category}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      {category}
                    </Typography>
                    <List dense>
                      {skills.map((skill, skillIndex) => (
                        <ListItem key={skillIndex} sx={{ py: 0.5 }}>
                          <ListItemIcon>
                            <StarIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={skill} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </SectionContainer>

        {/* Certifications */}
        <SectionContainer>
          <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 3 }}>
            <StarIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
            Certifications
          </Typography>
          <Grid container spacing={2}>
            {certifications.map((cert, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <Typography variant="body1" fontWeight="medium">
                      {cert}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </SectionContainer>

        {/* Download CTA */}
        <SectionContainer sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Ready to Learn More?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Download my complete resume to see detailed information about my experience, 
            skills, and achievements.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadResume}
            sx={{ mt: 2 }}
          >
            Download Full Resume
          </Button>
        </SectionContainer>
      </Container>
    </MainContent>
  );
};

export default Resume;
