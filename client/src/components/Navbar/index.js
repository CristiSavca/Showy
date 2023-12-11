
import React, { useEffect, useRef, useState } from 'react';
import { Nav, NavLink, NavMenu }
	from "./NavbarElements";

import { signup, login, logout, useAuth } from '../../firebase';
import { saveUsernameId } from '../../redux/slices/saveUsernameSlice';
import { useDispatch } from 'react-redux';

const Navbar = () => {
	const currentUser = useAuth();
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	async function handleLogout() {
		setLoading(true);
		try {
			await logout();
			dispatch(saveUsernameId(""));
		} catch {
			alert("Error!");
		}
		setLoading(false);
	}
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/feed" activeStyle>
						Feed
					</NavLink>
					<NavLink to="/profile" activeStyle>
						Profile
					</NavLink>
				</NavMenu>
				<div className="logout-container">
                {currentUser && (
                    <button
                        disabled={loading || !currentUser}
                        onClick={handleLogout}
                        className="logout-button"
                    >
                    Log Out
                    </button>
                    )}
            </div>
			</Nav>
		</>
	);
};

export default Navbar;
