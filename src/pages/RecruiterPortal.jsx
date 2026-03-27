import React, { useState, useEffect } from 'react';
import learnersData from '../data/learners.json';
import { Briefcase, Star, Mail } from 'lucide-react';

const RecruiterPortal = () => {
  const [learners, setLearners] = useState([]);

  useEffect(() => {
    const fetchLearners = async () => {
      try {
        const response = await new Promise((resolve) => {
          setTimeout(() => resolve(learnersData), 600);
        });
        setLearners(response);
      } catch (error) {
        console.error("Error fetching learners:", error);
      }
    };
    
    fetchLearners();
  }, []);

  if (learners.length === 0) return <div style={{ padding: '20px', color: 'white' }}>Loading candidates...</div>;

  const handleHireClick = (name) => {
    alert(`Message sent to ${name} for a freelance opportunity!`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2><Briefcase style={{ marginRight: '10px' }} /> Hire Top Learners</h2>
        <p>Find the best talent based on their real verified skills and XP levels.</p>
      </div>

      <div style={styles.grid}>
        {learners.map((learner) => (
          <div key={learner.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3>{learner.name}</h3>
              <div style={styles.levelBadge}>
                <Star size={16} color="gold" />
                <span>Level {learner.level} ({learner.xp} XP)</span>
              </div>
            </div>
            
            <div style={styles.skills}>
              {learner.skills.map((skill, index) => (
                <span key={index} style={styles.skillTag}>{skill}</span>
              ))}
            </div>
            
            <p style={{ color: learner.status.includes('Available') ? '#4CAF50' : '#f44336', fontWeight: 'bold' }}>
              {learner.status}
            </p>

            <button 
              style={{...styles.hireBtn, opacity: learner.status.includes('Available') ? 1 : 0.5}}
              disabled={!learner.status.includes('Available')}
              onClick={() => handleHireClick(learner.name)}
            >
              <Mail size={16} /> Contact for Work
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px', backgroundColor: '#121212', color: '#e0e0e0', minHeight: 'calc(100vh - 65px)' },
  header: { marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '10px', border: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '15px' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  levelBadge: { display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: '#2d2d2d', padding: '5px 10px', borderRadius: '15px', fontSize: '14px', border: '1px solid #444' },
  skills: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  skillTag: { backgroundColor: '#333', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' },
  hireBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginTop: 'auto' }
};

export default RecruiterPortal;