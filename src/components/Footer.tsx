import NavLink from './NavLink'

/*
      <NavLink href="/legal">Legal</NavLink>
      <NavLink href="/contact">Contact</NavLink>
*/

export default function Footer() {
  return (
    <div className="w-full flex flex-row gap-4 pb-4 pt-8">
      <NavLink href="/guestbook" hideIndicatorSpace>
        Guestbook
      </NavLink>
      <NavLink href="/info">Site Info</NavLink>
    </div>
  )
}
