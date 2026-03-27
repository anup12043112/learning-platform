import React from 'react';
import { BookOpen, Award, User } from 'lucide-react'; 
import { useUser } from '../context/UserContext'; 
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  const { user } = useUser(); 

  return (
    <nav style={styles.nav}>
      <div style={styles.logoContainer}>
        <Link to="/" style={styles.logo}>
          <BookOpen size={28} color="#4CAF50" />
          <h2 style={{ margin: 0, color: 'white', textDecoration: 'none' }}>LearnX</h2>
        </Link>
        
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>Learn</Link>
          <Link to="/recruit" style={styles.link}>Hire Talent</Link>
        </div>
      </div>
      
      <div style={styles.rightMenu}>
        <div style={styles.xpBadge}>
          <Award size={20} color="gold" />
          <span>Level {user.level} | {user.xp} XP</span> 
        </div>
        
    
        <Link to="/profile" style={styles.profileBtn}>
          <User size={18} />
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#1e1e1e', color: 'white', alignItems: 'center', borderBottom: '2px solid #333' },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '40px' },
  logo: { display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' },
  navLinks: { display: 'flex', gap: '20px' },
  link: { color: '#ccc', textDecoration: 'none', fontSize: '16px', fontWeight: '500' },
  rightMenu: { display: 'flex', alignItems: 'center', gap: '20px' },
  xpBadge: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#2d2d2d', padding: '8px 15px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #444' },
  profileBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 15px', cursor: 'pointer', borderRadius: '5px', border: 'none', backgroundColor: '#4CAF50', color: 'white', fontWeight: 'bold', textDecoration: 'none' }
};

export default Navbar;