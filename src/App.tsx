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
import { CAOFrameworkView } from './views/CAOFrameworkView';
import { FrameworkDetailView } from './views/FrameworkDetailView';
import { SampleView } from './views/SampleView';
import { TeamsView } from './views/TeamsView';
import { ResourcesView } from './views/ResourcesView';
import { ToolkitView } from './views/ToolkitView';
import { StudentsView } from './views/StudentsView';
import { ManifestoView } from './views/ManifestoView';
import { AuthorView } from './views/AuthorView';
import { SpeakingView } from './views/SpeakingView';
import { PressView } from './views/PressView';
import { IdeasView } from './views/IdeasView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { StoriesView } from './views/StoriesView';
import { BuyView } from './views/BuyView';

import { AssessmentModal } from './components/AssessmentModal';
import { ChapterModal } from './components/ChapterModal';
import { LabCanvasModal } from './components/LabCanvasModal';
import { SpeakingInquiryModal } from './components/SpeakingInquiryModal';
import { ArticleModal } from './components/ArticleModal';
import { BuyModal } from './components/BuyModal';
import { InfographicModal } from './components/InfographicModal';

import { parseCurrentRoute, navigateTo, RouteState } from './utils/router';
import { updatePageSeo } from './utils/seo';
import { ARTICLES } from './data/articlesData';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteState>(() => parseCurrentRoute());
  const [currentFrameworkId, setCurrentFrameworkId] = useState<string>('cao-framework');
  const [currentArticleId, setCurrentArticleId] = useState<string>(() => ARTICLES[0]?.id || 'from-builder-to-curator');

  // Modals
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [sampleChapterNumber, setSampleChapterNumber] = useState<number | null>(null);
  const [activeCanvasResource, setActiveCanvasResource] = useState<LabResource | null>(null);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [isSpeakingModalOpen, setIsSpeakingModalOpen] = useState(false);
  const [speakingTopic, setSpeakingTopic] = useState<string>('The Engineer After Code');
  const [activeInfographicId, setActiveInfographicId] = useState<string | null>(null);

  // Sync with browser URL / history and saved theme on initial load & popstate
  useEffect(() => {
    // Restore dark mode preference
    try {
      const savedTheme = localStorage.getItem('beyond-theme');
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}

    const handleRouteChange = () => {
      const route = parseCurrentRoute();
      setCurrentRoute(route);
      if (route.page === 'framework-detail' && route.param) {
        setCurrentFrameworkId(route.param);
      }
      if (route.page === 'article-detail' && route.param) {
        setCurrentArticleId(route.param);
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
    if (page === 'home') {
      updatePageSeo({
        title: 'Beyond AI Engineering | Harsh Verma',
        description:
          'Beyond AI Engineering by Harsh Verma explores how engineers move from Creator to Architect to Orchestrator in the age of AI agents, building careers around judgment, systems thinking, and trust.',
        canonicalPath: '/',
        schemaType: 'WebSite',
      });
    } else if (page === 'book') {
      updatePageSeo({
        title: 'The Book | Beyond AI Engineering — Harsh Verma',
        description:
          'Read Beyond AI Engineering: From Creator to Curator by Harsh Verma. The practical career operating system for engineers navigating AI agents, code generation, and systems orchestration.',
        canonicalPath: '/book',
        ogType: 'book',
        schemaType: 'Book',
        breadcrumbs: [{ name: 'The Book', path: '/book' }],
      });
    } else if (page === 'frameworks') {
      updatePageSeo({
        title: '10 Proprietary Frameworks for the Agentic Era | Beyond AI Engineering',
        description:
          'Explore the 10 proprietary frameworks from Beyond AI Engineering by Harsh Verma: Trust Economy, How to What, Prompt Empathy, Agentic Diplomacy, Ethical Curation, and more.',
        canonicalPath: '/frameworks',
        breadcrumbs: [{ name: 'Frameworks', path: '/frameworks' }],
      });
    } else if (page === 'resources') {
      updatePageSeo({
        title: 'Interactive Engineering Lab & Canvases | Beyond AI Engineering',
        description:
          'Interactive strategy canvases, ethical AI audit rubrics, and the 30-60-90 day engineering leadership transition planner from Beyond AI Engineering.',
        canonicalPath: '/resources',
        breadcrumbs: [{ name: 'Resources', path: '/resources' }],
      });
    } else if (page === 'toolkit') {
      updatePageSeo({
        title: 'The Living AI Engineering Toolkit | Beyond AI Engineering',
        description:
          'Curated tools, prompt architectures, agent frameworks, and evaluation harness recommendations for modern AI orchestrators.',
        canonicalPath: '/toolkit',
        breadcrumbs: [{ name: 'Toolkit', path: '/toolkit' }],
      });
    } else if (page === 'students') {
      updatePageSeo({
        title: 'Student & New Grad Guide | Beyond AI Engineering',
        description:
          'How computer science students and early-career engineers can thrive when LLMs write syntax: build proof of work, develop product judgment, and orchestrate systems.',
        canonicalPath: '/students',
        breadcrumbs: [{ name: 'Students', path: '/students' }],
      });
    } else if (page === 'manifesto') {
      updatePageSeo({
        title: 'The Engineer After Code Manifesto | Beyond AI Engineering',
        description:
          'The 10 foundational theses for software engineers building careers in the age of generative models, autonomous agents, and ambient intelligence.',
        canonicalPath: '/manifesto',
        breadcrumbs: [{ name: 'Manifesto', path: '/manifesto' }],
      });
    } else if (page === 'author') {
      updatePageSeo({
        title: 'Harsh Verma | Author of Beyond AI Engineering',
        description:
          'Harsh Verma is the author of Beyond AI Engineering, Principal AI Engineer, Fellow of BCS, IEEE Senior Member, and Forbes Technology Council Member.',
        canonicalPath: '/author',
        ogType: 'profile',
        schemaType: 'ProfilePage',
        breadcrumbs: [{ name: 'Author', path: '/author' }],
      });
    } else if (page === 'speaking') {
      updatePageSeo({
        title: 'Keynotes & Speaking | Harsh Verma — Beyond AI Engineering',
        description:
          'Book Harsh Verma for keynotes, executive briefings, and engineering all-hands on the future of engineering, autonomous agents, and the trust economy.',
        canonicalPath: '/speaking',
        breadcrumbs: [{ name: 'Speaking', path: '/speaking' }],
      });
    } else if (page === 'press') {
      updatePageSeo({
        title: 'Press Kit & Media Assets | Beyond AI Engineering',
        description:
          'Official press kit, high-resolution author headshots, book covers, approved author bio, and media inquiry contacts for Harsh Verma.',
        canonicalPath: '/press',
        breadcrumbs: [{ name: 'Press', path: '/press' }],
      });
    } else if (page === 'ideas') {
      updatePageSeo({
        title: 'Ideas Beyond the Book | Essays & Research by Harsh Verma',
        description:
          'In-depth essays, technical commentary, and ongoing research on the transition from code-centric to judgment-centric software engineering.',
        canonicalPath: '/ideas',
        breadcrumbs: [{ name: 'Ideas', path: '/ideas' }],
      });
    } else if (page === 'stories') {
      updatePageSeo({
        title: 'Reader Stories & Field Reports | Beyond AI Engineering',
        description:
          'Real-world accounts from engineers, managers, and architects putting the C.A.O. framework and trust economy principles into practice.',
        canonicalPath: '/stories',
        breadcrumbs: [{ name: 'Stories', path: '/stories' }],
      });
    } else if (page === 'buy') {
      updatePageSeo({
        title: 'Buy Beyond AI Engineering | Hardcover, Paperback & Digital',
        description:
          'Order Beyond AI Engineering by Harsh Verma from Amazon, Barnes & Noble, Bookshop.org, and direct digital retailers.',
        canonicalPath: '/book/buy',
        breadcrumbs: [
          { name: 'The Book', path: '/book' },
          { name: 'Order Now', path: '/book/buy' },
        ],
      });
    }
  }, [currentRoute.page]);

  const handleNavigate = (pageOrPath: PageId | string) => {
    if (pageOrPath.startsWith('/')) {
      navigateTo(pageOrPath);
      return;
    }
    if (pageOrPath === 'home') {
      navigateTo('/');
    } else if (pageOrPath === 'sample') {
      navigateTo('/book/sample');
    } else if (pageOrPath === 'buy') {
      navigateTo('/book/buy');
    } else if (pageOrPath === 'teams') {
      navigateTo('/teams');
    } else if (pageOrPath === 'cao-framework') {
      navigateTo('/cao-framework');
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
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] dark:bg-[#070B14] text-[#101828] dark:text-[#F1F5F9] selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900/40 dark:selection:text-blue-200 transition-colors duration-200">
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
            onOpenAssessment={() => setIsAssessmentOpen(true)}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
          />
        )}

        {currentPage === 'frameworks' && (
          <FrameworksView
            onNavigate={handleNavigate}
            onOpenAssessment={() => setIsAssessmentOpen(true)}
          />
        )}

        {currentPage === 'framework-detail' && (
          <FrameworkDetailView
            frameworkId={currentFrameworkId}
            onNavigate={handleNavigate}
            onSelectFramework={(id) => {
              setCurrentFrameworkId(id);
              handleNavigate('/frameworks/' + id);
            }}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
          />
        )}

        {currentPage === 'sample' && (
          <SampleView
            onNavigate={handleNavigate}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
            onOpenInfographicModal={handleOpenInfographic}
          />
        )}

        {currentPage === 'teams' && (
          <TeamsView
            onNavigate={handleNavigate}
            onOpenAssessment={() => setIsAssessmentOpen(true)}
          />
        )}

        {currentPage === 'resources' && (
          <ResourcesView
            onNavigate={handleNavigate}
            onOpenCanvas={(resource) => setActiveCanvasResource(resource)}
            onOpenAssessment={() => setIsAssessmentOpen(true)}
            onOpenInfographicModal={handleOpenInfographic}
          />
        )}

        {currentPage === 'toolkit' && (
          <ToolkitView onNavigate={handleNavigate} />
        )}

        {currentPage === 'students' && (
          <StudentsView
            onNavigate={handleNavigate}
            onOpenAssessment={() => setIsAssessmentOpen(true)}
            onOpenInfographicModal={handleOpenInfographic}
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
            onOpenArticle={(art) => {
              setCurrentArticleId(art.id);
              handleNavigate('/ideas/' + art.id);
            }}
          />
        )}

        {currentPage === 'article-detail' && (
          <ArticleDetailView
            articleId={currentArticleId}
            onNavigate={handleNavigate}
            onSelectArticle={(id) => {
              setCurrentArticleId(id);
              handleNavigate('/ideas/' + id);
            }}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
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
        onOpenInfographicModal={handleOpenInfographic}
      />

      {/* High-Resolution Infographic Zoom & Navigation Modal */}
      <InfographicModal
        isOpen={activeInfographicId !== null}
        initialInfographicId={activeInfographicId || 'infographic-intro'}
        onClose={() => setActiveInfographicId(null)}
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
