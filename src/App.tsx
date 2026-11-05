/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, LabResource, Article } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { BookView } from './views/BookView';
import { FrameworksView } from './views/FrameworksView';
import { ResourcesView } from './views/ResourcesView';
import { ToolkitView } from './views/ToolkitView';
import { StudentsView } from './views/StudentsView';
import { ManifestoView } from './views/ManifestoView';
import { AuthorView } from './views/AuthorView';
import { SpeakingView } from './views/SpeakingView';
import { PressView } from './views/PressView';
import { IdeasView } from './views/IdeasView';
import { StoriesView } from './views/StoriesView';
import { BuyView } from './views/BuyView';

import { AssessmentModal } from './components/AssessmentModal';
import { ChapterModal } from './components/ChapterModal';
import { LabCanvasModal } from './components/LabCanvasModal';
import { SpeakingInquiryModal } from './components/SpeakingInquiryModal';
import { ArticleModal } from './components/ArticleModal';
import { BuyModal } from './components/BuyModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Modals
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [sampleChapterNumber, setSampleChapterNumber] = useState<number | null>(null);
  const [activeCanvasResource, setActiveCanvasResource] = useState<LabResource | null>(null);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [isSpeakingModalOpen, setIsSpeakingModalOpen] = useState(false);
  const [speakingTopic, setSpeakingTopic] = useState<string>('The Engineer After Code');

  // Sync with browser hash on initial load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'book',
        'frameworks',
        'resources',
        'toolkit',
        'students',
        'manifesto',
        'author',
        'speaking',
        'press',
        'ideas',
        'stories',
        'buy',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSample = (chapterNum: number = 1) => {
    setSampleChapterNumber(chapterNum);
  };

  const handleOpenSpeaking = (topic?: string) => {
    if (topic) setSpeakingTopic(topic);
    setIsSpeakingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#101828] selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Header / Navbar following Top Bar Contract */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBuyModal={() => setIsBuyModalOpen(true)}
        onOpenAssessment={() => setIsAssessmentOpen(true)}
      />

      {/* 2. Main Page Views */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
            onOpenAssessment={() => setIsAssessmentOpen(true)}
            onOpenSample={() => handleOpenSample(1)}
          />
        )}

        {currentPage === 'book' && (
          <BookView
            onNavigate={handleNavigate}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
            onOpenSample={handleOpenSample}
          />
        )}

        {currentPage === 'frameworks' && (
          <FrameworksView
            onNavigate={handleNavigate}
            onOpenAssessment={() => setIsAssessmentOpen(true)}
          />
        )}

        {currentPage === 'resources' && (
          <ResourcesView
            onNavigate={handleNavigate}
            onOpenCanvas={(resource) => setActiveCanvasResource(resource)}
            onOpenAssessment={() => setIsAssessmentOpen(true)}
          />
        )}

        {currentPage === 'toolkit' && (
          <ToolkitView onNavigate={handleNavigate} />
        )}

        {currentPage === 'students' && (
          <StudentsView
            onNavigate={handleNavigate}
            onOpenAssessment={() => setIsAssessmentOpen(true)}
          />
        )}

        {currentPage === 'manifesto' && (
          <ManifestoView
            onNavigate={handleNavigate}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
          />
        )}

        {currentPage === 'author' && (
          <AuthorView
            onNavigate={handleNavigate}
            onOpenSpeakingModal={() => handleOpenSpeaking()}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
          />
        )}

        {currentPage === 'speaking' && (
          <SpeakingView
            onNavigate={handleNavigate}
            onOpenSpeakingModal={handleOpenSpeaking}
          />
        )}

        {currentPage === 'press' && (
          <PressView onNavigate={handleNavigate} />
        )}

        {currentPage === 'ideas' && (
          <IdeasView
            onNavigate={handleNavigate}
            onOpenArticle={(art) => setActiveArticle(art)}
          />
        )}

        {currentPage === 'stories' && (
          <StoriesView
            onNavigate={handleNavigate}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
            onOpenAssessment={() => setIsAssessmentOpen(true)}
          />
        )}

        {currentPage === 'buy' && (
          <BuyView
            onNavigate={handleNavigate}
            onOpenSample={() => handleOpenSample(1)}
          />
        )}
      </main>

      {/* 3. Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBuyModal={() => setIsBuyModalOpen(true)}
        onOpenAssessment={() => setIsAssessmentOpen(true)}
      />

      {/* 4. Global Interactive Modals */}
      
      {/* C.A.O. Assessment Modal */}
      <AssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        onOpenBuyModal={() => setIsBuyModalOpen(true)}
      />

      {/* Sample Chapter Reader Modal */}
      <ChapterModal
        isOpen={sampleChapterNumber !== null}
        initialChapterNumber={sampleChapterNumber || 1}
        onClose={() => setSampleChapterNumber(null)}
        onOpenBuyModal={() => setIsBuyModalOpen(true)}
      />

      {/* Lab Canvas / Worksheet Modal */}
      <LabCanvasModal
        resource={activeCanvasResource}
        onClose={() => setActiveCanvasResource(null)}
      />

      {/* Speaking Inquiry Modal */}
      <SpeakingInquiryModal
        isOpen={isSpeakingModalOpen}
        defaultTopic={speakingTopic}
        onClose={() => setIsSpeakingModalOpen(false)}
      />

      {/* Ideas / Article Reader Modal */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onOpenBuyModal={() => setIsBuyModalOpen(true)}
      />

      {/* Buy / Retailer Hub Modal */}
      <BuyModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        onOpenSample={() => {
          setIsBuyModalOpen(false);
          handleOpenSample(1);
        }}
      />
    </div>
  );
}
