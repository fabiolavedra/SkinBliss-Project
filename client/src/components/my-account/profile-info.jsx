import React from 'react';
import { useSelector } from 'react-redux';

const ProfileInfo = () => {
  const { user } = useSelector((state) => state.auth);

  // Helper function to format skin type for display
  const formatSkinType = (skinType) => {
    if (!skinType) return 'Not specified';

    const skinTypeMap = {
      oily: 'Oily',
      dry: 'Dry',
      combination: 'Combination',
      sensitive: 'Sensitive',
      acne_prone_skin: 'Acne Prone Skin',
      dry_acne_prone_skin: 'Dry Acne Prone Skin',
      hiperpigmentation: 'Hiperpigmentation',
      not_specified: 'Not specified',
    };

    return skinTypeMap[skinType] || skinType;
  };

  // Helper function to format role for display
  const formatRole = (role) => {
    if (!role) return 'User';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className="profile-info">
      <div className="profile-info-content">
        <div className="profile-info-section mb-25">
          <h4 className="profile-section-title mb-15">Personal Information</h4>
          <ul className="profile-info-list">
            <li className="profile-info-item mb-10">
              <span className="profile-label">Full Name: </span>
              <span className="profile-value">
                {user?.name} {user?.surname}
              </span>
            </li>
            <li className="profile-info-item mb-10">
              <span className="profile-label">Email: </span>
              <span className="profile-value">{user?.email}</span>
            </li>
            <li className="profile-info-item mb-10">
              <span className="profile-label">Phone: </span>
              <span className="profile-value">{user?.phone || 'Not provided'}</span>
            </li>
            <li className="profile-info-item mb-10">
              <span className="profile-label">User ID: </span>
              <span className="profile-value">{user?.id || 'N/A'}</span>
            </li>
            <li className="profile-info-item mb-10">
              <span className="profile-label">Role: </span>
              <span className="profile-value">
                <span className={`badge ${user?.role === 'admin' ? 'bg-primary' : 'bg-success'}`}>{formatRole(user?.role)}</span>
              </span>
            </li>
            <li className="profile-info-item mb-10">
              <span className="profile-label">Account Status: </span>
              <span className="profile-value">
                <span className={`badge bg-success`}>Active</span>
              </span>
            </li>
            <li className="profile-info-item mb-10">
              <span className="profile-label">Skin Type: </span>
              <span className="profile-value">
                <span className={`badge ${user?.skinType === 'not_specified' ? 'bg-warning' : 'bg-info'}`}>{formatSkinType(user?.skinType)}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
