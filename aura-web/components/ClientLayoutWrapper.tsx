'use client';

import React, { createContext, useContext, useState } from 'react';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';
import EnquiryModal from './EnquiryModal';
import DemoInboxDrawer from './DemoInboxDrawer';
import InteractiveFeatureModal, { FeatureType } from './InteractiveFeatureModal';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';

interface ModalContextType {
  openEnquiryModal: (options?: {
    title?: string;
    subtitle?: string;
    targetEntity?: string;
    type?: 'business_inquiry' | 'event_booth' | 'join_network' | 'general_contact';
  }) => void;
  openFeatureModal: (type: FeatureType) => void;
  openDemoDrawer: () => void;
}

const ModalContext = createContext<ModalContextType>({
  openEnquiryModal: () => {},
  openFeatureModal: () => {},
  openDemoDrawer: () => {},
});

export const useModals = () => useContext(ModalContext);

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryModalConfig, setEnquiryModalConfig] = useState<{
    title?: string;
    subtitle?: string;
    targetEntity?: string;
    type?: 'business_inquiry' | 'event_booth' | 'join_network' | 'general_contact';
  }>({});

  const [demoDrawerOpen, setDemoDrawerOpen] = useState(false);
  const [activeFeatureType, setActiveFeatureType] = useState<FeatureType | null>(null);

  const openEnquiryModal = (options?: {
    title?: string;
    subtitle?: string;
    targetEntity?: string;
    type?: 'business_inquiry' | 'event_booth' | 'join_network' | 'general_contact';
  }) => {
    setEnquiryModalConfig(options || {});
    setEnquiryModalOpen(true);
  };

  const openFeatureModal = (type: FeatureType) => {
    setActiveFeatureType(type);
  };

  const openDemoDrawer = () => {
    setDemoDrawerOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{
        openEnquiryModal,
        openFeatureModal,
        openDemoDrawer,
      }}
    >
      <div className="flex flex-col min-h-screen">
        <AnnouncementBar onOpenJoinModal={() => openEnquiryModal({
          title: 'Join IndiNiger Global Business Network',
          subtitle: 'Register your enterprise into our cross-border directory connecting 57 countries.',
          type: 'join_network',
        })} />

        <Navbar
          onOpenJoinModal={() => openEnquiryModal({
            title: 'Join the Global Business Network',
            subtitle: 'Apply for accredited member listing and international buyer matching.',
            type: 'join_network',
          })}
          onOpenDemoDrawer={openDemoDrawer}
        />

        <main className="flex-1">{children}</main>

        <Footer onOpenJoinModal={() => openEnquiryModal({
          title: 'Join the Global Business Network',
          subtitle: 'Expand your market reach across 62 business categories.',
          type: 'join_network',
        })} />

        {/* Global Floating WhatsApp Quick Connect */}
        <FloatingWhatsAppButton />

        {/* Global Modals */}
        <EnquiryModal
          isOpen={enquiryModalOpen}
          onClose={() => setEnquiryModalOpen(false)}
          title={enquiryModalConfig.title}
          subtitle={enquiryModalConfig.subtitle}
          targetEntity={enquiryModalConfig.targetEntity}
          defaultType={enquiryModalConfig.type || 'business_inquiry'}
        />

        <DemoInboxDrawer
          isOpen={demoDrawerOpen}
          onClose={() => setDemoDrawerOpen(false)}
        />

        <InteractiveFeatureModal
          type={activeFeatureType}
          onClose={() => setActiveFeatureType(null)}
          onOpenEnquiry={(customTitle, entity) => {
            openEnquiryModal({
              title: customTitle,
              targetEntity: entity,
              type: 'business_inquiry',
            });
          }}
        />
      </div>
    </ModalContext.Provider>
  );
}
