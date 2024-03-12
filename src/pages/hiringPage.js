import BaseHeader from './components/baseHeader';
import ProfileList from './components/profileList';
import {useState} from 'react';
import $ from 'jquery';
import '../styles/hiringPage.css';
import InviteForm from './components/inviteForm';
import AckModal from './components/ackModal';

const profiles = [
  {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    userBio: 'Software Engineer',
    userSkills: ['React', 'Node.js', 'Express', 'MongoDB'],
    userAbout : 'I am a software engineer with 5 years of experience in web development. I have worked on various projects using React, Node.js, Express, and MongoDB. I am passionate about learning new technologies and building scalable applications.'
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    username: 'janesmith',
    userBio: 'Frontend Developer',
    userSkills: ['JavaScript', 'React', 'HTML', 'CSS'],
    userAbout : 'I am a frontend developer with a focus on building responsive and user-friendly web applications using modern technologies such as JavaScript, React, HTML, and CSS.'
  },
  {
    firstName: 'Michael',
    lastName: 'Johnson',
    username: 'michaeljohnson',
    userBio: 'Full Stack Developer',
    userSkills: ['React', 'Node.js', 'Express', 'MongoDB', 'Angular'],
    userAbout : 'I am a full stack developer proficient in both frontend and backend technologies. I have experience building scalable web applications using React, Angular, Node.js, Express, and MongoDB.'
  },
  {
    firstName: 'Emily',
    lastName: 'Brown',
    username: 'emilybrown',
    userBio: 'UI/UX Designer',
    userSkills: ['UI Design', 'UX Design', 'Prototyping', 'Adobe XD'],
    userAbout : 'I am a UI/UX designer passionate about creating intuitive and visually appealing user interfaces. I specialize in prototyping and wireframing using tools like Adobe XD.'
  },
  {
    firstName: 'David',
    lastName: 'Wilson',
    username: 'davidwilson',
    userBio: 'Data Scientist',
    userSkills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
    userAbout : 'I am a data scientist with expertise in Python, machine learning, data analysis, and SQL. I have a strong background in statistical modeling and predictive analytics.'
  },
  {
    firstName: 'Sarah',
    lastName: 'Garcia',
    username: 'sarahgarcia',
    userBio: 'Backend Developer',
    userSkills: ['Node.js', 'Express', 'MongoDB', 'Python', 'Django'],
    userAbout : 'I am a backend developer proficient in building RESTful APIs and web services using Node.js, Express, MongoDB, Python, and Django. I have experience in database management and server-side scripting.'
  },
  {
    firstName: 'Daniel',
    lastName: 'Martinez',
    username: 'danielmartinez',
    userBio: 'DevOps Engineer',
    userSkills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Terraform'],
    userAbout : 'I am a DevOps engineer specializing in automating software development and deployment processes. I have experience with containerization using Docker and Kubernetes, continuous integration and continuous deployment (CI/CD), and cloud infrastructure management on AWS.'
  },
  {
    firstName: 'Olivia',
    lastName: 'Taylor',
    username: 'oliviataylor',
    userBio: 'Product Manager',
    userSkills: ['Product Management', 'Agile', 'Scrum', 'Market Research'],
    userAbout : 'I am a product manager with a passion for building innovative products that meet customer needs. I have experience in agile methodologies, market research, and product roadmap planning.'
  },
  {
    firstName: 'James',
    lastName: 'Anderson',
    username: 'jamesanderson',
    userBio: 'QA Engineer',
    userSkills: ['Manual Testing', 'Automation Testing', 'Selenium', 'Jenkins'],
    userAbout : 'I am a QA engineer with expertise in manual and automation testing. I have experience in creating test plans, executing test cases, and implementing automated testing frameworks using tools like Selenium and Jenkins.'
  },
  {
    firstName: 'Sophia',
    lastName: 'Thomas',
    username: 'sophiathomas',
    userBio: 'Technical Writer',
    userSkills: ['Technical Writing', 'Documentation', 'Content Management'],
    userAbout : 'I am a technical writer specializing in creating clear and concise documentation for software products. I have experience in content management systems and writing technical articles, user manuals, and API documentation.'
  }
];

function HiringPage(){
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [showForm, setShowForm] = useState(false);
  const [showAck, setShowAck] = useState(false);
  const [ackMessage, setAckMessage] = useState('');
  const [ackType, setAckType] = useState('');
  const [invitee, setInvitee] = useState({});

  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = () => setShowForm(true);

  const handleCloseAck = () => setShowAck(false);
  const handleShowAck = () => setShowAck(true);

  const searchFunc = () => {
        const username = $('#search-username').val();
        const skill = $('#search-skill').val();
        const title = $('#search-title').val();

        let allProfiles = profiles;

        if (username !== '') {
            allProfiles = allProfiles.filter(profile => profile.username.toLowerCase().includes(username.toLowerCase()));
        }
        if (skill !== '') {
            allProfiles = allProfiles.filter(profile => {
                for(let userSkill of profile.userSkills) {
                    if (userSkill.toLowerCase().includes(skill.toLowerCase())){
                        return true;
                    }
                }
                return false;
            });
        }
        if (title !== '') {
            allProfiles = allProfiles.filter(profile => profile.userBio.toLowerCase().includes(title.toLowerCase()));
        }

        setFilteredProfiles(allProfiles);
  }

  const generateInviteForm = (invitee) => {
    setInvitee(invitee);
    handleShowForm();
  }

  const handleInvite = (event) =>{
    event.preventDefault();
    handleCloseForm();
    sendAck('success', 'Invitation sent successfully');
  }

  const sendAck = (type, message) => {
    setAckMessage(message);
    setAckType(type);
    handleShowAck();
  }

  const inviter = {
    username: 'johnsmith'
  }

  return(
    <div className='hiring-main'>
        <AckModal showAck={showAck} handleCloseAck={handleCloseAck} ackType={ackType} message = {ackMessage} />
        <BaseHeader />
        <InviteForm invitee={invitee} inviter={inviter} showForm = {showForm} handleCloseForm={handleCloseForm} handleSubmit={handleInvite}/>
        <h1 className='title my-4'>People to Hire</h1>
        <div className="hiring-main-div">
            <div className='filter-div'>
                <form className="d-flex mb-4" role="search">
                    <input
                        id='search-username'
                        className="form-control"
                        type="search"
                        placeholder="Search by Username (Eg : johndoe)"
                        aria-label="Search"
                        onChange ={searchFunc}
                    />
                </form>
                <form className="d-flex mb-4" role="search">
                    <input
                        id='search-skill'
                        className="form-control"
                        type="search"
                        placeholder="Search by Skill (Eg : React)" 
                        aria-label="Search"
                        onChange ={searchFunc}
                    />
                </form>
                <form className="d-flex" role="search">
                    <input
                        id='search-title'
                        className="form-control"
                        type="search"
                        placeholder="Search by Title (Eg : Data Scientist)"
                        aria-label="Search"
                        onChange ={searchFunc}
                    />
                </form>
            </div>
            <div className='list-div'>
                {filteredProfiles.map((profile, index) => {
                  return <ProfileList key={index} profile={profile} handleShowInviteForm = {generateInviteForm}/>
                })}
            </div>
        </div>
    </div>
)};

export default HiringPage;