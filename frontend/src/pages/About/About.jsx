import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Container,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Code as CodeIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { MainContent, SectionContainer } from '../../styles/globalStyles';

const About = () => {
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java',
    'HTML/CSS', 'SQL', 'Git', 'Docker', 'AWS', 'MongoDB'
  ];

  const experiences = [
    {
      title: 'Software Engineer',
      company: 'Tech Company',
      period: '2022 - Present',
      description: 'Developing scalable web applications and leading technical initiatives.'
    },
    {
      title: 'Frontend Developer',
      company: 'Startup Inc',
      period: '2020 - 2022',
      description: 'Built responsive user interfaces and collaborated with design teams.'
    },
    {
      title: 'Junior Developer',
      company: 'Digital Agency',
      period: '2019 - 2020',
      description: 'Learned modern web development practices and contributed to client projects.'
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Technology',
      year: '2019',
      description: 'Graduated with honors, focused on software engineering and algorithms.'
    }
  ];

  return (
    <MainContent>
      <Container maxWidth="lg">
        {/* About Me Section */}
        <SectionContainer>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 3,
                bgcolor: 'primary.main',
                fontSize: '3rem'
              }}
            >
              JD
            </Avatar>
            <Typography variant="h2" component="h1" gutterBottom>
              About Me
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Passionate Software Engineer
            </Typography>
          </Box>
          
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            I'm a dedicated software engineer with a passion for creating innovative solutions 
            that make a difference. With several years of experience in full-stack development, 
            I specialize in building scalable web applications and user-friendly interfaces.
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            My journey in technology started with curiosity and has evolved into a career focused 
            on continuous learning and growth. I believe in writing clean, maintainable code and 
            collaborating effectively with teams to deliver exceptional results.
          </Typography>
        </SectionContainer>

        {/* Skills Section */}
        <SectionContainer>
          <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
            <CodeIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
            Technical Skills
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                color="primary"
                variant="outlined"
                sx={{ fontSize: '0.9rem' }}
              />
            ))}
          </Box>
        </SectionContainer>

        {/* Experience Section */}
        <SectionContainer>
          <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
            <WorkIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
            Professional Experience
          </Typography>
          <Grid container spacing={3}>
            {experiences.map((exp, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {exp.title}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      {exp.company}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {exp.period}
                    </Typography>
                    <Typography variant="body2">
                      {exp.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </SectionContainer>

        {/* Education Section */}
        <SectionContainer>
          <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
            <SchoolIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
            Education
          </Typography>
          <Grid container spacing={3}>
            {education.map((edu, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {edu.degree}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      {edu.school}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {edu.year}
                    </Typography>
                    <Typography variant="body2">
                      {edu.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </SectionContainer>

        {/* Personal Interests */}
        <SectionContainer>
          <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
            <StarIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
            What I Love
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Continuous Learning
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Always exploring new technologies and staying up-to-date with industry trends.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Problem Solving
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enjoy tackling complex challenges and finding elegant solutions.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Team Collaboration
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Believe in the power of teamwork and knowledge sharing.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </SectionContainer>
      </Container>
    </MainContent>
  );
};

export default About;
