import {
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  MoreVertical,
  Settings,
  Users
} from 'lucide-react';

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Patients', icon: Users },
  { label: 'Schedule', icon: CalendarDays },
  { label: 'Message', icon: MessageSquare },
  { label: 'Transactions', icon: CreditCard }
];

function Header({ activeSection, onNavigate }) {
  return (
    <header className="topbar">
      <button
        className="brand"
        type="button"
        aria-label="Sofia's Tech.Care home"
        onClick={() => onNavigate('Overview')}
      >
        <span className="brand__mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="brand__text">Sofia&apos;s Tech.Care</span>
      </button>

      <nav className="topnav" aria-label="Primary">
        {navItems.map(({ label, icon: Icon }) => {
          const active = activeSection === label;

          return (
          <button
            className={`topnav__item${active ? ' topnav__item--active' : ''}`}
            type="button"
            aria-current={active ? 'page' : undefined}
            onClick={() => onNavigate(label)}
            key={label}
          >
            <Icon size={16} strokeWidth={2.2} aria-hidden="true" />
            <span>{label}</span>
          </button>
          );
        })}
      </nav>

      <div className="clinician" aria-label="Current clinician">
        <img
          src="https://fedskillstest.ct.digital/doctor.png"
          alt=""
          className="clinician__avatar"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
        <div className="clinician__copy">
          <strong>Dr. Jose Simmons</strong>
          <span>General Practitioner</span>
        </div>
        <span className="clinician__divider" aria-hidden="true" />
        <button className="icon-button" type="button" aria-label="Settings">
          <Settings size={18} aria-hidden="true" />
        </button>
        <button className="icon-button" type="button" aria-label="More options">
          <MoreVertical size={18} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

export default Header;
