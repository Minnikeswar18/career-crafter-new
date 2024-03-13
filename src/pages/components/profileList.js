import '../../styles/components/profileList.css';
import img from '../../assets/img/profile-pic.png';
import Tag from './tag';


function ProfileList({profile , handleShowInviteForm}) {
  return (
      <div className='profile-list'>
        <div className='profile-card'>
            <div className='first-row ps-2'>
                <img src={img} alt='profile-pic' className='profile-pic'/>
                <div className='title-div mb-0'>
                    <h3 className='name'>{(profile.firstName || profile.lastName) ? ((profile.firstName ? profile.firstName : "") + " " + (profile.lastName ? profile.lastName : "")) : (profile.username)}</h3>
                    <p className='user-name'>@{profile.username}</p>
                    <p className='user-title'>{profile.userBio}</p>
                </div>
            </div>
            <div className='second-row'>
                {profile.userSkills.slice(0 , Math.min(6 , profile.userSkills.length + 1)).map((skill, index) => {
                    return <Tag key={index} content={skill} />
                })}
            </div>
            <div className='third-row'>
                <p className='description ps-2'>{profile.userAbout}</p>
            </div>
        </div>
        <div className='buttons-div'>
            <button className='btn btn-primary mt-4'><a className='profile-link' href='https://www.google.com' target='_blank'>View Profile</a></button>
            <button className='btn btn-success mb-4' onClick={() => handleShowInviteForm(profile)}>Invite to Job</button>
        </div>
    </div>
  );
}

export default ProfileList;