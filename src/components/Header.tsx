import hudumaLogo from "@/assets/huduma logo.jpeg";
import coatOfArms from "@/assets/coat-of-arms.jpeg";

const Header = () => {
  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="kenya-stripe h-1.5" />
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={coatOfArms} alt="Republic of Kenya Coat of Arms" className="h-14 w-auto object-contain" />
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              HUDUMA KENYA
            </h1>
            <p className="text-xs text-muted-foreground">
              National ID Application Portal
            </p>
          </div>
        </div>
        <img src={hudumaLogo} alt="Huduma Kenya" className="h-14 w-auto object-contain" />
      </div>
    </header>
  );
};

export default Header;
