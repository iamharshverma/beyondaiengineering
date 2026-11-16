/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, CAOStageId, LabResource, Article } from './types';
import { Navbar } from './components/Navbar';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { BookView } from './views/BookView';
import { FrameworksView } from './views/FrameworksView';
import { CAOFrameworkView } from './views/CAOFrameworkView';
import { CAOStageView } from './views/CAOStageView';
import { FrameworkDetailView } from './views/FrameworkDetailView';
import { AssessmentView } from './views/AssessmentView';
import { SampleView } from './views/SampleView';
import { TeamsView } from './views/TeamsView';
import { ResourcesView } from './views/ResourcesView';
import { ResourceWorkspaceView } from './views/ResourceWorkspaceView';
import { ToolkitView } from './views/ToolkitView';
import { JourneyView } from './views/JourneyView';
import { ManifestoView } from './views/ManifestoView';
import { AuthorView } from './views/AuthorView';
import { SpeakingView } from './views/SpeakingView';
import { PressView } from './views/PressView';
import { InsightsView } from './views/InsightsView';
import { InsightDetailView } from './views/InsightDetailView';
import { StoriesView } from './views/StoriesView';
import { BuyView } from './views/BuyView';
import { ContactView } from './views/ContactView';

import { ChapterModal } from './components/ChapterModal';
import { LabCanvasModal } from './components/LabCanvasModal';
import { SpeakingInquiryModal } from './components/SpeakingInquiryModal';
import { ArticleModal } from './components/ArticleModal';
import { BuyModal } from './components/BuyModal';
import { InfographicModal } from './components/InfographicModal';

import { parseCurrentRoute, navigateTo, RouteState } from './utils/router';
import { updatePageSeo, PAGE_SEO_CONFIGS } from './utils/seo';
import { INSIGHTS } from './data/insightsData';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteState>(() => parseCurrentRoute());
  const [currentFrameworkId, setCurrentFrameworkId] = useState<string>(() =>
    currentRoute.page === 'framework-detail' && currentRoute.param
      ? currentRoute.param
      : 'trust-economy'
  );
  const [currentStageId, setCurrentStageId] = useState<CAOStageId>(() =>
    currentRoute.page === 'cao-stage' && currentRoute.param
      ? (currentRoute.param as CAOStageId)
      : 'creator'
  );
  const [currentResourceSlug, setCurrentResourceSlug] = useState<string>(() =>
    currentRoute.page === 'resource-detail' && currentRoute.param
      ? currentRoute.param
      : 'cao-career-map'
  );
  const [currentInsightSlug, setCurrentInsightSlug] = useState<string>(() => {
    if (
      (currentRoute.page === 'insight-detail' ||
        currentRoute.page === 'blog-detail' ||
        currentRoute.page === 'article-detail') &&
      currentRoute.param
    ) {
      return currentRoute.param;
    }
    return INSIGHTS[0]?.slug || 'whole-articles-local-model-accurate-15x-slow';
  });

  // Modals
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [sampleChapterNumber, setSampleChapterNumber] = useState<number | null>(null);
  const [activeCanvasResource, setActiveCanvasResource] = useState<LabResource | null>(null);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [isSpeakingModalOpen, setIsSpeakingModalOpen] = useState(false);
  const [speakingTopic, setSpeakingTopic] = useState<string>('The Engineer After Code');
  const [activeInfographicId, setActiveInfographicId] = useState<string | null>(null);
  const [readingProgress, setReadingProgress] = useState<number>(0);

  // Track scroll depth for subtle reading progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = (window.scrollY / scrollHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      } else {
        setReadingProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentRoute.page]);

  // Sync with browser URL / history and saved theme on initial load & popstate
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('beyond-theme');
      if (
        savedTheme === 'dark' ||
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {}

    const handleRouteChange = () => {
      const route = parseCurrentRoute();
      setCurrentRoute(route);
      if (route.page === 'framework-detail' && route.param) {
        setCurrentFrameworkId(route.param);
      }
      if (route.page === 'cao-stage' && route.param) {
        setCurrentStageId(route.param as CAOStageId);
      }
      if (route.page === 'resource-detail' && route.param) {
        setCurrentResourceSlug(route.param);
      }
      if (
        (route.page === 'insight-detail' ||
          route.page === 'blog-detail' ||
          route.page === 'article-detail') &&
        route.param
      ) {
        setCurrentInsightSlug(route.param);
      }
    };

    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  // Update SEO for top-level pages
  useEffect(() => {
    const page = currentRoute.page;
    if (PAGE_SEO_CONFIGS[page]) {
      updatePageSeo(PAGE_SEO_CONFIGS[page]);
    }
  }, [currentRoute.page]);

  const handleNavigate = (pageOrPath: PageId | string, param?: string) => {
    if (pageOrPath.startsWith('/')) {
      navigateTo(pageOrPath);
      return;
    }

    if (param) {
      if (pageOrPath === 'cao-stage') {
        setCurrentStageId(param as CAOStageId);
        navigateTo(`/frameworks/${param}`);
        return;
      }
      if (pageOrPath === 'resource-detail' || pageOrPath === 'resources') {
        setCurrentResourceSlug(param);
        navigateTo(`/resources/${param}`);
        return;
      }
      if (pageOrPath === 'frameworks' || pageOrPath === 'framework-detail') {
        if (param === 'cao-framework') {
          navigateTo('/cao-framework');
        } else if (param === 'creator' || param === 'architect' || param === 'orchestrator') {
          setCurrentStageId(param);
          navigateTo(`/frameworks/${param}`);
        } else {
          setCurrentFrameworkId(param);
          navigateTo(`/frameworks/${param}`);
        }
        return;
      }
      if (
        pageOrPath === 'insights' ||
        pageOrPath === 'insight-detail' ||
        pageOrPath === 'blog' ||
        pageOrPath === 'blog-detail' ||
        pageOrPath === 'ideas' ||
        pageOrPath === 'article-detail'
      ) {
        setCurrentInsightSlug(param);
        navigateTo(`/insights/${param}`);
        return;
      }
      navigateTo(`/${pageOrPath}/${param}`);
      return;
    }

    if (pageOrPath === 'home') {
      navigateTo('/');
    } else if (pageOrPath === 'sample') {
      navigateTo('/book/sample');
    } else if (pageOrPath === 'buy') {
      navigateTo('/book/buy');
    } else if (pageOrPath === 'assessment') {
      navigateTo('/assessment');
    } else if (pageOrPath === 'journey-working-engineers' || pageOrPath === 'engineers') {
      navigateTo('/journeys/working-engineers');
    } else if (pageOrPath === 'journey-ai-ml') {
      navigateTo('/journeys/ai-ml-professionals');
    } else if (pageOrPath === 'journey-technical-leaders') {
      navigateTo('/journeys/technical-leaders');
    } else if (pageOrPath === 'journey-students' || pageOrPath === 'students') {
      navigateTo('/journeys/students');
    } else if (pageOrPath === 'teams' || pageOrPath === 'organizations') {
      navigateTo('/organizations');
    } else if (pageOrPath === 'cao-framework') {
      navigateTo('/cao-framework');
    } else if (
      pageOrPath === 'blog' ||
      pageOrPath === 'ideas' ||
      pageOrPath === 'insights'
    ) {
      navigateTo('/insights');
    } else {
      navigateTo('/' + pageOrPath);
    }
  };

  const handleOpenSample = (chapterNum: number = 1) => {
    setSampleChapterNumber(chapterNum);
  };

  const handleOpenSpeaking = (topic?: string) => {
    if (topic) setSpeakingTopic(topic);
    setIsSpeakingModalOpen(true);
  };

  const handleOpenInfographic = (id: string = 'infographic-intro') => {
    setActiveInfographicId(id);
  };

  const currentPage = currentRoute.page;

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#FAFAF7] dark:bg-[#070B14] text-[#101828] dark:text-[#F1F5F9] selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900/40 dark:selection:text-blue-200 transition-colors duration-200">
      {/* Subtle Top Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-500 z-50 transition-all duration-75 pointer-events-none no-print"
        style={{ width: `${readingProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* 1. Header / Navbar following Top Bar Contract */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBuyModal={() => setIsBuyModalOpen(true)}
        onOpenAssessment={() => handleNavigate('/assessment')}
      />

      {/* 2. Main Page Views */}
      <main className="flex-1">
        {currentPage !== 'home' && (
          <Breadcrumbs
            currentPage={currentPage}
            frameworkId={currentFrameworkId}
            stageId={currentStageId}
            resourceSlug={currentResourceSlug}
            insightSlug={currentInsightSlug}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
            onOpenAssessment={() => handleNavigate('/assessment')}
            onOpenSample={() => handleOpenSample(1)}
            onOpenInfographicModal={handleOpenInfographic}
          />
        )}

        {currentPage === 'book' && (
          <BookView
            onNavigate={handleNavigate}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
            onOpenSample={handleOpenSample}
            onOpenInfographicModal={handleOpenInfographic}
          />
        )}

        {currentPage === 'cao-framework' && (
          <CAOFrameworkView
            onNavigate={handleNavigate}
            onOpenAssessment={() => handleNavigate('/assessment')}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
          />
        )}

        {currentPage === 'cao-stage' && (
          <CAOStageView
            stageId={currentStageId}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'assessment' && (
          <AssessmentView
            onNavigate={handleNavigate}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
          />
        )}

        {currentPage === 'frameworks' && (
          <FrameworksView
            onNavigate={handleNavigate}
            onOpenAssessment={() => handleNavigate('/assessment')}
          />
        )}

        {currentPage === 'framework-detail' && (
          <FrameworkDetailView
            frameworkId={currentFrameworkId}
            onNavigate={handleNavigate}
            onSelectFramework={(id) => {
              if (id === 'cao-framework') {
                handleNavigate('/cao-framework');
              } else {
                setCurrentFrameworkId(id);
                handleNavigate('/frameworks/' + id);
              }
            }}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
          />
        )}

        {currentPage === 'sample' && (
          <SampleView
            onNavigate={handleNavigate}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
          />
        )}

        {(currentPage === 'organizations' || currentPage === 'teams') && (
          <TeamsView
            onNavigate={handleNavigate}
            onOpenAssessment={() => handleNavigate('/assessment')}
          />
        )}

        {currentPage === 'resources' && (
          <ResourcesView
            onNavigate={handleNavigate}
            onOpenCanvas={(resource) => setActiveCanvasResource(resource)}
            onOpenAssessment={() => handleNavigate('/assessment')}
            onOpenInfographicModal={handleOpenInfographic}
          />
        )}

        {currentPage === 'resource-detail' && (
          <ResourceWorkspaceView
            slug={currentResourceSlug}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'toolkit' && (
          <ToolkitView onNavigate={handleNavigate} />
        )}

        {(currentPage === 'journey-working-engineers' || currentPage === 'engineers') && (
          <JourneyView
            journeySlug="working-engineers"
            onNavigate={handleNavigate}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
          />
        )}

        {currentPage === 'journey-ai-ml' && (
          <JourneyView
            journeySlug="ai-ml-professionals"
            onNavigate={handleNavigate}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
          />
        )}

        {currentPage === 'journey-technical-leaders' && (
          <JourneyView
            journeySlug="technical-leaders"
            onNavigate={handleNavigate}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
          />
        )}

        {(currentPage === 'journey-students' || currentPage === 'students') && (
          <JourneyView
            journeySlug="students"
            onNavigate={handleNavigate}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
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

        {(currentPage === 'insights' ||
          currentPage === 'blog' ||
          currentPage === 'ideas') && (
          <InsightsView
            onNavigate={handleNavigate}
            onSelectInsight={(slug) => {
              setCurrentInsightSlug(slug);
              handleNavigate('/insights/' + slug);
            }}
          />
        )}

        {(currentPage === 'insight-detail' ||
          currentPage === 'blog-detail' ||
          currentPage === 'article-detail') && (
          <InsightDetailView
            slug={currentInsightSlug}
            onNavigate={handleNavigate}
            onSelectInsight={(slug) => {
              setCurrentInsightSlug(slug);
              handleNavigate('/insights/' + slug);
            }}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
            onOpenSample={() => handleOpenSample(1)}
          />
        )}

        {currentPage === 'stories' && (
          <StoriesView
            onNavigate={handleNavigate}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
            onOpenAssessment={() => handleNavigate('/assessment')}
          />
        )}

        {currentPage === 'buy' && (
          <BuyView
            onNavigate={handleNavigate}
            onOpenSample={() => handleOpenSample(1)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView onNavigate={handleNavigate} />
        )}
      </main>

      {/* 3. Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBuyModal={() => setIsBuyModalOpen(true)}
        onOpenAssessment={() => handleNavigate('/assessment')}
      />

      {/* 4. Global Interactive Modals */}

      <ChapterModal
        isOpen={sampleChapterNumber !== null}
        initialChapterNumber={sampleChapterNumber || 1}
        onClose={() => setSampleChapterNumber(null)}
        onOpenBuyModal={() => setIsBuyModalOpen(true)}
        onOpenInfographicModal={handleOpenInfographic}
      />

      <InfographicModal
        isOpen={activeInfographicId !== null}
        initialInfographicId={activeInfographicId || 'infographic-intro'}
        onClose={() => setActiveInfographicId(null)}
        onOpenBuyModal={() => setIsBuyModalOpen(true)}
      />

      <LabCanvasModal
        resource={activeCanvasResource}
        onClose={() => setActiveCanvasResource(null)}
      />

      <SpeakingInquiryModal
        isOpen={isSpeakingModalOpen}
        defaultTopic={speakingTopic}
        onClose={() => setIsSpeakingModalOpen(false)}
      />

      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onOpenBuyModal={() => setIsBuyModalOpen(true)}
      />

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
