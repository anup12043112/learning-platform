import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Trophy, Star, BookOpen, Activity, Award } from 'lucide-react';

const UserProfile = () => {
  const { user } = useUser();
  const [recentActivity, setRecentActivity] = useState([]);

  // Mocking an API call to get user's recent activity
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await new Promise((resolve) => {
          setTimeout(() => resolve([
            { id: 1, action: "Completed Quiz: Introduction to Databases", xpEarned: 50, date: "Today" },
            { id: 2, action: "Read Chapter: Understanding SQL", xpEarned: 0, date: "Today" },
            { id: 3, action: "Completed Course: Google Cloud Basics", xpEarned: 200, date: "Yesterday" }
          ]), 500);
        });
        setRecentActivity(data);
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };
    
    fetchActivity();
  }, []);

  // Calculate progress to next level (Har 100 XP pe level up hota hai)
  const xpForNextLevel = 100;
  const currentLevelXP = user.xp % 100;
  const progressPercentage = (currentLevelXP / xpForNextLevel) * 100;

  return (
    <div style={styles.container}>
      <div style={styles.profileHeader}>
        <div style={styles.avatarCircle}>
          {user.name.charAt(0)}
        </div>
        <div>
          <h1 style={{ margin: 0, color: '#fff' }}>{user.name}</h1>
          <p style={{ color: '#aaa', marginTop: '5px' }}>Aspiring Developer | Open to Freelance</p>
        </div>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <Star size={32} color="gold" />
          <div style={styles.statInfo}>
            <h3>Level {user.level}</h3>
            <p>Current Rank</p>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <Award size={32} color="#4CAF50" />
          <div style={styles.statInfo}>
            <h3>{user.xp} XP</h3>
            <p>Total Experience</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <BookOpen size={32} color="#2196F3" />
          <div style={styles.statInfo}>
            <h3>4 Courses</h3>
            <p>In Progress</p>
          </div>
        </div>
      </div>

      <div style={styles.progressSection}>
        <h3>Progress to Level {user.level + 1}</h3>
        <div style={styles.progressBarBg}>
          <div style={{...styles.progressBarFill, width: `${progressPercentage}%`}}></div>
        </div>
        <p style={{ textAlign: 'right', color: '#aaa', fontSize: '14px', marginTop: '8px' }}>
          {currentLevelXP} / 100 XP
        </p>
      </div>

      <div style={styles.activitySection}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
          <Activity size={20} /> Recent Activity
        </h3>
        {recentActivity.length === 0 ? (
          <p>Loading activity...</p>
        ) : (
          <ul style={styles.activityList}>
            {recentActivity.map((activity) => (
              <li key={activity.id} style={styles.activityItem}>
                <div>
                  <strong>{activity.action}</strong>
                  <div style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>{activity.date}</div>
                </div>
                {activity.xpEarned > 0 && (
                  <span style={styles.xpGained}>+{activity.xpEarned} XP</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px', maxWidth: '900px', margin: '0 auto', color: '#e0e0e0', fontFamily: 'sans-serif' },
  profileHeader: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px', backgroundColor: '#1e1e1e', padding: '30px', borderRadius: '12px', border: '1px solid #333' },
  avatarCircle: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#4CAF50', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 'bold' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' },
  statCard: { backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '12px', border: '1px solid #333', display: 'flex', alignItems: 'center', gap: '20px' },
  statInfo: { display: 'flex', flexDirection: 'column' },
  progressSection: { backgroundColor: '#1e1e1e', padding: '30px', borderRadius: '12px', border: '1px solid #333', marginBottom: '40px' },
  progressBarBg: { width: '100%', height: '12px', backgroundColor: '#333', borderRadius: '6px', overflow: 'hidden', marginTop: '15px' },
  progressBarFill: { height: '100%', backgroundColor: '#4CAF50', transition: 'width 0.5s ease-in-out' },
  activitySection: { backgroundColor: '#1e1e1e', padding: '30px', borderRadius: '12px', border: '1px solid #333' },
  activityList: { listStyle: 'none', padding: 0, margin: 0 },
  activityItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #2d2d2d' },
  xpGained: { backgroundColor: 'rgba(76, 175, 80, 0.1)', color: '#4CAF50', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', border: '1px solid #4CAF50' }
};

export default UserProfile;