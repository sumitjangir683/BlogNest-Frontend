import React from 'react'
import{ Button } from './ui/Button.jsx'
import {Link} from 'react-router-dom'
function Logo({width = '100px'}) {
  return  (
    <Button asChild variant="ghost">
    <Link className="text-lg text-white" to="/">
      <BlogLogo className="h-8 w-8" />
      &nbsp;&nbsp;BlogNest
    </Link>
  </Button>
)
}
const BlogLogo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="none"
    stroke="slate-white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Outer rectangle */}
    <rect x="2" y="3" width="20" height="18" rx="2" ry="2" stroke="white" fill="black" />
    
    {/* Top bars */}
    <path d="M6 2v4h2V2h8v4h2V2H6z" fill="gray" />
    
    {/* Lines for text */}
    <path d="M8 11h8M8 15h6" stroke="white" />
    
    {/* Middle square */}
    <rect x="11" y="7" width="2" height="6" fill="gray" />
    
    {/* Speech bubble */}
    <path d="M4 17h16l-4-4H8l-4 4z" stroke="white" fill="gray" />
  </svg>
);





export default Logo