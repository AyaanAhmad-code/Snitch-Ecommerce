import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router'

const Nav = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    const cartItems = useSelector(state => state.cart.items)
    const [searchTerm, setSearchTerm] = useState('')
    const location = useLocation()

    useEffect(() => {
        if (location.pathname !== '/') {
            setSearchTerm('');
        } else if (!new URLSearchParams(location.search).has('q')) {
            setSearchTerm('');
        }
    }, [location.pathname, location.search]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm.trim() !== '') {
                navigate(`/?q=${encodeURIComponent(searchTerm.trim())}`, { replace: true })
            } else if (location.pathname === '/' && new URLSearchParams(location.search).has('q')) {
                navigate(`/`, { replace: true })
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, navigate, location.pathname, location.search]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            if (searchTerm.trim()) {
                navigate(`/?q=${encodeURIComponent(searchTerm.trim())}`)
            } else {
                navigate(`/`)
            }
        }
    }

    return (
        <nav className="px-8 lg:px-16 xl:px-24 pt-10 pb-6 flex items-center justify-between border-b" style={{ borderColor: '#e4e2df' }}>
            <Link to="/"
                className="text-sm font-medium tracking-[0.35em] uppercase hover:opacity-80 transition-opacity"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}
            >
                Snitch.
            </Link>
            
            <div className="hidden md:flex flex-1 max-w-md mx-8 items-center border-b px-2 py-1" style={{ borderColor: '#e4e2df' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#7A6E63' }}>
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input 
                    type="text" 
                    placeholder="Search collection..." 
                    className="w-full bg-transparent border-none outline-none text-[12px] px-3 font-light placeholder:text-[#a09a93] text-[#1b1c1a]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearch}
                />
            </div>

            <div className="flex gap-6 items-center text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: '#7A6E63' }}>
                {user ? (
                    <>
                        <span style={{ color: '#1b1c1a' }}>{user.fullname}</span>
                        {user.role === 'seller' && (
                            <Link to="/seller/dashboard" className="transition-colors hover:text-[#C9A96E]">Seller Dashboard</Link>
                        )}
                        <Link
                            to="/cart"
                            className="relative flex items-center hover:opacity-70 transition-opacity"
                            style={{ color: '#1b1c1a' }}
                            aria-label="Shopping cart"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                                <line x1="3" y1="6" x2="21" y2="6"/>
                                <path d="M16 10a4 4 0 0 1-8 0"/>
                            </svg>
                            {cartItems.length > 0 && (
                                <span
                                    className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white"
                                    style={{
                                        backgroundColor: '#C9A96E',
                                        width: '16px',
                                        height: '16px',
                                        fontSize: '9px',
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 600,
                                        letterSpacing: 0,
                                    }}
                                >
                                    {cartItems.length > 9 ? '9+' : cartItems.length}
                                </span>
                            )}
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="transition-colors hover:text-[#C9A96E]">Sign In</Link>
                        <Link to="/register" className="transition-colors hover:text-[#C9A96E]">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav