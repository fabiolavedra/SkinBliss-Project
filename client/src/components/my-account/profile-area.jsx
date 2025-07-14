import React, { useState } from 'react';
import ProfileNavTab from './profile-nav-tab';
import ProfileShape from './profile-shape';
import NavProfileTab from './nav-profile-tab';
import ProfileInfo from './profile-info';
import MyOrders from './my-orders';

const ProfileArea = ({ orderData }) => {
  const [activeTab, setActiveTab] = useState('profile');
  return (
    <>
      <section className="profile__area pt-120 pb-120">
        <div className="container">
          <div className="profile__inner p-relative">
            <ProfileShape />
            <div className="row">
              <div className="col-xxl-4 col-lg-4">
                <div className="profile__tab mr-40">
                  <ProfileNavTab activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
              </div>
              <div className="col-xxl-8 col-lg-8">
                <div className="profile__tab-content">
                  <div className="tab-content" id="profile-tabContent">
                    <div className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`} id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                      <NavProfileTab orderData={orderData} />
                    </div>

                    <div className={`tab-pane fade ${activeTab === 'information' ? 'show active' : ''}`} id="nav-information" role="tabpanel" aria-labelledby="nav-information-tab">
                      <ProfileInfo />
                    </div>

                    <div className={`tab-pane fade ${activeTab === 'order' ? 'show active' : ''}`} id="nav-order" role="tabpanel" aria-labelledby="nav-order-tab">
                      <MyOrders orderData={orderData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileArea;
