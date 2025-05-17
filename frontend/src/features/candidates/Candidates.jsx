import Sidebar from "../../components/Sidebar";
import UserProfile from "../../components/userProfile/UserProfile";
import { useState } from "react";
import Modal from "../../components/logout_modal/Modal";


const Candidates = () => {
  const [candidates, setCandidates] = useState([
    {
      id: "01",
      name: "Jacob William",
      email: "jacob.william@example.com",
      phone: "(252) 555-0111",
      position: "Senior Developer",
      status: "New",
      experience: "1+"
    },
    {
      id: "02",
      name: "Guy Hawkins",
      email: "kenzi.lawson@example.com",
      phone: "(907) 555-0101",
      position: "Human Resource Manager",
      status: "Selected",
      experience: "3+"
    },
    {
      id: "03",
      name: "Arlene McCoy",
      email: "arlene.mccoy@example.com",
      phone: "(302) 555-0107",
      position: "Full Time Designer",
      status: "Selected",
      experience: "2+"
    },
    {
      id: "04",
      name: "Leslie Alexander",
      email: "willie.jennings@example.com",
      phone: "(207) 555-0119",
      position: "Full Time Developer",
      status: "Rejected",
      experience: "0"
    }
  ]);
  
  const [openStatusDropdown, setOpenStatusDropdown] = useState(null);
  const [openActionDropdown, setOpenActionDropdown] = useState(null);

  const [candidateModal, setCandidateModal] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    resume: null,
    declaration: false
  });
  
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setNewCandidate({...newCandidate, [name]: files[0]});
    } else if (type === 'checkbox') {
      setNewCandidate({...newCandidate, [name]: checked});
    } else {
      setNewCandidate({...newCandidate, [name]: value});
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save the new candidate
    console.log("New candidate:", newCandidate);
    setCandidateModal(false);
  };
  
  const statusOptions = ["New", "Scheduled", "Ongoing", "Selected", "Rejected"];
  
  const handleStatusChange = (candidateId, newStatus) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === candidateId ? {...candidate, status: newStatus} : candidate
    ));
    setOpenStatusDropdown(null);
  };
  
  const toggleStatusDropdown = (candidateId) => {
    if (openStatusDropdown === candidateId) {
      setOpenStatusDropdown(null);
    } else {
      setOpenStatusDropdown(candidateId);
      setOpenActionDropdown(null);
    }
  };
  
  const toggleActionDropdown = (candidateId) => {
    if (openActionDropdown === candidateId) {
      setOpenActionDropdown(null);
    } else {
      setOpenActionDropdown(candidateId);
      setOpenStatusDropdown(null);
    }
  };


  return (
    <div className="header-row">
      <Sidebar />
     
      <main>
        <div className="top-header">
          <h3>Candidates</h3>
          <div>
            <UserProfile />
          </div>
        </div>
        <div className="filter-bar">
          <div className="flex">
            <select className="filter-select">
              <option value="">Status</option>
              <option value="New">New</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select className="filter-select">
              <option value="Position">Position</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Human Resource">Human Resource</option>
            </select>
          </div>

          <div className="flex">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input className="search-input" type="text" placeholder="Search" />
            </div>

            <button onClick={() => setCandidateModal(true)} className="add-button">Add Candidate</button>
          </div>
        </div>

        {/* Candidate modal */}
        {candidateModal && (
          <Modal isOpen={candidateModal} onClose={() => setCandidateModal(false)}>
            <h2>Add New Candidate</h2>
            <form onSubmit={handleSubmit} className="candidate-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={newCandidate.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address<span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={newCandidate.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number<span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={newCandidate.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="position" className="form-label">
                    Position<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    className="form-control"
                    value={newCandidate.position}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="experience" className="form-label">
                    Experience<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    className="form-control"
                    value={newCandidate.experience}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="resume" className="form-label">
                    Resume<span className="required">*</span>
                  </label>
                  <div className="resume-upload">
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      className="form-control-file"
                      onChange={handleInputChange}
                      required
                    />
                    <span className="upload-icon">📤</span>
                  </div>
                </div>
              </div>
              
              <div className="declaration">
                <input
                  type="checkbox"
                  id="declaration"
                  name="declaration"
                  checked={newCandidate.declaration}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="declaration">
                  I hereby declare that the above information is true to the best of my knowledge and belief
                </label>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="save-button">Save</button>
              </div>
            </form>
          </Modal>
        )}

        <div className="candidates-table-container">
          <table className="candidates-table">
            <thead className="table-header">
              <tr>
                <th>Sr no.</th>
                <th>Candidates Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Position</th>
                <th>Status</th>
                <th>Experience</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td>{candidate.id}</td>
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.phone}</td>
                  <td>{candidate.position}</td>
                  <td>
                    <div className="status-dropdown-container">
                      <div 
                        className={`status-badge ${candidate.status.toLowerCase()}`}
                        onClick={() => toggleStatusDropdown(candidate.id)}
                      >
                        {candidate.status}
                        <span className="dropdown-arrow">▼</span>
                      </div>
                      
                      {openStatusDropdown === candidate.id && (
                        <div className="status-dropdown">
                          {statusOptions.map(status => (
                            <div 
                              key={status} 
                              className="status-option"
                              onClick={() => handleStatusChange(candidate.id, status)}
                            >
                              {status}
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  </td>
                  <td>{candidate.experience}</td>
                  <td>
                    <div className="action-dropdown-container">
                      <button 
                        className="action-button"
                        onClick={() => toggleActionDropdown(candidate.id)}
                      >
                        ⋮
                      </button>
                      
                      {openActionDropdown === candidate.id && (
                        <div className="action-dropdown">
                          <div className="action-option">Download Resume</div>
                          <div className="action-option">Delete Candidate</div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Candidates;
