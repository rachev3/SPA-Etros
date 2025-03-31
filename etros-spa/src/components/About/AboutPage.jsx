import React from "react";
import AboutHeroSection from "./AboutHeroSection";
import MissionStatementSection from "./MissionStatementSection";
import HistoryTimelineSection from "./HistoryTimelineSection";
import CoreValuesSection from "./CoreValuesSection";
import ContactInfoSection from "./ContactInfoSection";

const AboutPage = () => {
  return (
    <div className="bg-white">
      <AboutHeroSection />
      <MissionStatementSection />
      <HistoryTimelineSection />
      <CoreValuesSection />
      <ContactInfoSection />
    </div>
  );
};

export default AboutPage;
