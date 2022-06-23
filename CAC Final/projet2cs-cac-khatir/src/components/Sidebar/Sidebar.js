import React from "react";
import SidebarLink from "../SidebarLink/SidebarLink";
import "./styles.css";
import logo from '../../assets/CAC.png';

const Sidebar = ({ links }) => {
	return (
		<div>
			<div className="sidebar-container">
				<div className="sidebareWrapper">
				{/* <button
					className="navbar-toggler bg-white"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button> */}
				 <span className="logo"><img src={logo} width="150px" alt="logo"/></span>
				<div id="navbarSupportedContent">
					<span className="spacer"/>

					
					<ul className="link-list">
						{links.map((link) => {
							return <SidebarLink link={link} key={link.id} className="sidebarListItem" />;
						})}
					</ul>
				</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
