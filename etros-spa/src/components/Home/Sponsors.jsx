import React from "react";
import "./Sponsors.css";

const Sponsors = () => {
  return (
    <section className="sponsors-section">
      <div className="sponsors-container">
        <div className="sponsors-header">
          <h2 className="sponsors-title">Our Sponsors</h2>
          <div className="sponsors-divider"></div>
          <p className="sponsors-description">
            We're proud to partner with these leading brands who support our
            team and share our values of excellence, teamwork, and community
            engagement.
          </p>
        </div>

        <div className="sponsors-content">
          <h3 className="sponsors-category-title primary">Official Partners</h3>
          <div className="official-partners-grid">
            <div className="sponsor-card primary">
              <img
                src="https://placehold.co/200x80/111/ddd?text=SPONSOR+1"
                alt="Sponsor 1"
              />
            </div>
            <div className="sponsor-card primary">
              <img
                src="https://placehold.co/200x80/111/ddd?text=SPONSOR+2"
                alt="Sponsor 2"
              />
            </div>
            <div className="sponsor-card primary">
              <img
                src="https://placehold.co/200x80/111/ddd?text=SPONSOR+3"
                alt="Sponsor 3"
              />
            </div>
            <div className="sponsor-card primary">
              <img
                src="https://placehold.co/200x80/111/ddd?text=SPONSOR+4"
                alt="Sponsor 4"
              />
            </div>
          </div>

          <h3 className="sponsors-category-title secondary">
            Supporting Partners
          </h3>
          <div className="supporting-partners-grid">
            <div className="sponsor-card secondary">
              <img
                src="https://placehold.co/150x60/111/ddd?text=PARTNER+1"
                alt="Partner 1"
              />
            </div>
            <div className="sponsor-card secondary">
              <img
                src="https://placehold.co/150x60/111/ddd?text=PARTNER+2"
                alt="Partner 2"
              />
            </div>
            <div className="sponsor-card secondary">
              <img
                src="https://placehold.co/150x60/111/ddd?text=PARTNER+3"
                alt="Partner 3"
              />
            </div>
            <div className="sponsor-card secondary">
              <img
                src="https://placehold.co/150x60/111/ddd?text=PARTNER+4"
                alt="Partner 4"
              />
            </div>
            <div className="sponsor-card secondary">
              <img
                src="https://placehold.co/150x60/111/ddd?text=PARTNER+5"
                alt="Partner 5"
              />
            </div>
            <div className="sponsor-card secondary">
              <img
                src="https://placehold.co/150x60/111/ddd?text=PARTNER+6"
                alt="Partner 6"
              />
            </div>
          </div>
        </div>

        <div className="become-sponsor">
          <h3 className="become-sponsor-title">Become a Sponsor</h3>
          <p className="become-sponsor-description">
            Join our team of partners and connect your brand with our passionate
            fanbase. We offer various sponsorship packages tailored to meet your
            marketing objectives.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
