import React, { useState, useEffect } from 'react';
import './navbar.css';
import { Navbar, Container, Nav, Offcanvas} from 'react-bootstrap';
//logo
import BlockLogo from '../../assets/logo-block.jpeg';
import WhiteLogo from '../../assets/logo.jpeg';

import axios from 'axios'


function AppNavbar() {
    const expand = 'lg'; // Or 'sm', 'md', 'xl', 'xxl', or false
    const [navbarLogo, setNavbarLogo]=useState(WhiteLogo)
    const [navbar, setNavbar]=useState(false); 
    const [resumeId, setResumeId]=useState(null) 

    const changeBackground=()=>{
      // console.log(window.scrollY)
      if(window.scrollY >=66){
        setNavbar(true)
      }else{
        setNavbar(false)
      }
    }
  useEffect(() => {
    changeBackground()
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground)
  })

  //logo scroll function
  const changeLogo = () => {
    if (window.scrollY >= 60) {
      setNavbarLogo(BlockLogo)
    } else {
      setNavbarLogo(BlockLogo)
    }
  }

  useEffect(() => {
    changeLogo()
    // adding the event when scroll change Logo
    window.addEventListener("scroll", changeLogo)
  })

const downloadResume = async (id) => {
  try {
    const res = await axios.get(`/api/resume/download/${id}`, {
      responseType: 'blob',
    });

    // 🔥 Get MIME type
    const mimeType = res.headers['content-type'];

    // 🔥 Map MIME → extension
    const mimeToExt = {
      'application/pdf': 'pdf',
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    };

    const ext = mimeToExt[mimeType] || 'file';

    // 🔥 Extract original filename (if exists)
    let fileName = 'resume';

    const disposition = res.headers['content-disposition'];
    if (disposition) {
      const match = disposition.match(/filename="?(.+)"?/);
      if (match?.[1]) {
        fileName = decodeURIComponent(match[1]);
      }
    } else {
      // fallback
      fileName = `resume.${ext}`;
    }

    const blob = new Blob([res.data], { type: mimeType });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error('Download failed', err);
  }
};

   useEffect(() => {
    const fetchResume = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/resume`)
      setResumeId(res.data?._id)
    }

    fetchResume()
  }, [])
  return (
   <Navbar key={expand} expand={expand} className={`mb-3 ${navbar ? 'navbar scrolled':'navbar'} navbar-expand-lg navbar-dark fixed-top`} id="main-nav">
      <Container>
        <Navbar.Brand href="#home">   
        <img src={navbarLogo} alt='KreativeHussain' className='img-fluid' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} 
          placement="end" // Can be 'start', 'end', 'top', or 'bottom'
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3" id="navbar-example2">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#skills">Skills</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
              <Nav.Link onClick={() => downloadResume(resumeId)} className='nav-link custom-resume-link'>
                <i className="bi bi-download pe-1"></i>Resume
              </Nav.Link>             
              {/* Add more Nav.Link or NavDropdown components as needed */}
            </Nav>
            {/* You can also place forms or other content here */}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
