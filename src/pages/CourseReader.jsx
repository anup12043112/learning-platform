import React, { useState, useEffect } from 'react';
import coursesData from '../data/courses.json';
import { useUser } from '../context/UserContext';
import { Book } from 'lucide-react';

const CourseReader = () => {
  const [courses, setCourses] = useState([]); // Ab pura array store karenge
  const [activeCourseIndex, setActiveCourseIndex] = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  
  const { addXP } = useUser(); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Pura coursesData array fetch kar rahe hain
        const response = await new Promise((resolve) => {
          setTimeout(() => resolve(coursesData), 500);
        });
        setCourses(response);
      } catch (error) {
        console.error("Error loading courses:", error);
      }
    };
    
    fetchCourses();
  }, []);

  if (courses.length === 0) return <div style={{ padding: '20px', color: 'white' }}>Loading learning modules...</div>;

  const activeCourse = courses[activeCourseIndex];
  const activeChapter = activeCourse.chapters[activeChapterIndex];

  const handleQuizSubmit = (selectedOption) => {
    if (selectedOption === activeChapter.quiz.correctAnswer) {
      addXP(activeChapter.quiz.xpReward); 
      alert(`Correct! You earned ${activeChapter.quiz.xpReward} XP. Excellent work!`);
    } else {
      alert("Incorrect, try reading the lecture again!");
    }
    setShowQuiz(false); 
  };

  const handleCourseChange = (e) => {
    setActiveCourseIndex(Number(e.target.value));
    setActiveChapterIndex(0); // Course change hone par chapter 1 pe le aao
    setShowQuiz(false);
  };

  return (
    <div style={styles.container}>
      {/* Sidebar for Course Selection and Chapters */}
      <div style={styles.sidebar}>
        
        {/* Course Selector Dropdown */}
        <div style={styles.courseSelectorBox}>
          <label style={{ fontSize: '12px', color: '#aaa', marginBottom: '5px', display: 'block' }}>CURRENT COURSE</label>
          <select 
            value={activeCourseIndex} 
            onChange={handleCourseChange}
            style={styles.selectInput}
          >
            {courses.map((course, index) => (
              <option key={course.courseId} value={index}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <h3 style={{ color: '#4CAF50', fontSize: '16px', marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Book size={18} /> Course Content
        </h3>
        
        <ul style={styles.chapterList}>
          {activeCourse.chapters.map((chap, index) => (
            <li 
              key={chap.chapterId} 
              style={{
                ...styles.chapterItem, 
                backgroundColor: index === activeChapterIndex ? '#333' : 'transparent',
                borderLeft: index === activeChapterIndex ? '4px solid #4CAF50' : '4px solid transparent'
              }}
              onClick={() => {
                setActiveChapterIndex(index);
                setShowQuiz(false); 
              }}
            >
              {index + 1}. {chap.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div style={styles.mainContent}>
        <div style={{ marginBottom: '10px', color: '#4CAF50', fontWeight: 'bold' }}>
          {activeCourse.title} / Chapter {activeChapterIndex + 1}
        </div>
        <h1 style={{ marginTop: 0, fontSize: '32px' }}>{activeChapter.title}</h1>
        
        <div style={styles.lectureText}>
          <p style={{ whiteSpace: 'pre-line' }}>{activeChapter.content}</p>
        </div>

        {/* Quiz Section */}
        <div style={styles.actionArea}>
          {!showQuiz ? (
            <button style={styles.quizBtn} onClick={() => setShowQuiz(true)}>
              Take Quiz to Earn XP
            </button>
          ) : (
            <div style={styles.quizBox}>
              <h3 style={{ marginTop: 0, color: '#4CAF50' }}>Quiz Time!</h3>
              <p style={{ fontSize: '18px', fontWeight: '500' }}>{activeChapter.quiz.question}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                {activeChapter.quiz.options.map((opt, i) => (
                  <button key={i} style={styles.optionBtn} onClick={() => handleQuizSubmit(opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', height: 'calc(100vh - 65px)', backgroundColor: '#121212', color: '#e0e0e0', fontFamily: 'sans-serif' },
  sidebar: { width: '280px', borderRight: '1px solid #333', padding: '20px', overflowY: 'auto', backgroundColor: '#1a1a1a' },
  courseSelectorBox: { backgroundColor: '#2d2d2d', padding: '12px', borderRadius: '8px', border: '1px solid #444' },
  selectInput: { width: '100%', padding: '8px', backgroundColor: '#1e1e1e', color: 'white', border: '1px solid #555', borderRadius: '4px', outline: 'none', cursor: 'pointer' },
  chapterList: { listStyleType: 'none', padding: 0, marginTop: '10px' },
  chapterItem: { padding: '12px', cursor: 'pointer', borderRadius: '4px', marginBottom: '8px', transition: '0.2s', fontWeight: '500', fontSize: '15px' },
  mainContent: { flex: 1, padding: '40px 60px', overflowY: 'auto' },
  lectureText: { lineHeight: '1.8', fontSize: '17px', marginTop: '20px', color: '#ccc' },
  actionArea: { marginTop: '50px', borderTop: '1px solid #333', paddingTop: '30px', paddingBottom: '50px' },
  quizBtn: { padding: '12px 24px', fontSize: '16px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s' },
  quizBox: { backgroundColor: '#1e1e1e', padding: '25px', borderRadius: '8px', border: '1px solid #444', maxWidth: '600px' },
  optionBtn: { padding: '12px 15px', backgroundColor: '#2d2d2d', color: 'white', border: '1px solid #555', borderRadius: '5px', cursor: 'pointer', textAlign: 'left', fontSize: '16px', transition: '0.2s' }
};

export default CourseReader;