
import { Car, History, Plus } from "lucide-react";
import { NavLink } from "./navlink";

const Navigation = () => {
  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">Fleet Manager</span>
          </div>
          <div className="flex gap-1">
            <NavLink
              to="/"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeClassName="bg-secondary text-foreground"
            >
              <Car className="h-4 w-4" />
              Vehicles
            </NavLink>
            <NavLink
              to="/new-booking"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeClassName="bg-secondary text-foreground"
            >
              <Plus className="h-4 w-4" />
              New Booking
            </NavLink>
            <NavLink
              to="/history"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeClassName="bg-secondary text-foreground"
            >
              <History className="h-4 w-4" />
              History
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
