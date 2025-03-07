'use strict';

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Blog.js');
    
    // Get all article previews and full articles
    const articleList = document.querySelector('.article-list');
    const fullArticles = document.querySelectorAll('.full-article');
    
    console.log('Article List:', articleList);
    console.log('Full Articles:', fullArticles);

    // Function to show specific article and hide the list
    function showArticle(articleId) {
        console.log('Showing article:', articleId);
        // Remove the # from the articleId
        const id = articleId.replace('#', '');
        
        // Hide article list
        if (articleList) {
            articleList.classList.add('hidden');
        }
        
        // Hide all articles first
        fullArticles.forEach(article => {
            article.classList.add('hidden');
        });
        
        // Show the selected article
        const selectedArticle = document.getElementById(id);
        if (selectedArticle && selectedArticle.classList.contains('full-article')) {
            console.log('Found article:', id);
            selectedArticle.classList.remove('hidden');
            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Function to show article list and hide all articles
    function showArticleList() {
        console.log('Showing article list');
        // Show article list
        if (articleList) {
            articleList.classList.remove('hidden');
        }
        
        // Hide all articles
        fullArticles.forEach(article => {
            article.classList.add('hidden');
        });
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Update URL without triggering a page reload
        history.pushState({}, '', 'blog.html');
    }

    // Handle clicks on article previews
    document.querySelectorAll('.article-preview a[href^="#"]').forEach(anchor => {
        console.log('Setting up click handler for:', anchor.getAttribute('href'));
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const articleId = this.getAttribute('href');
            console.log('Article link clicked:', articleId);
            showArticle(articleId);
            // Update URL without triggering a page reload
            history.pushState({}, '', `blog.html${articleId}`);
        });
    });

    // Handle back to list button clicks
    document.querySelectorAll('.back-to-list').forEach(button => {
        console.log('Setting up back button handler');
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Back to list clicked');
            showArticleList();
        });
    });

    // Check for hash in URL on page load
    if (window.location.hash && document.querySelector(`#${window.location.hash.substring(1)}.full-article`)) {
        console.log('Found hash in URL:', window.location.hash);
        showArticle(window.location.hash);
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        console.log('Popstate event, hash:', window.location.hash);
        if (window.location.hash && document.querySelector(`#${window.location.hash.substring(1)}.full-article`)) {
            showArticle(window.location.hash);
        } else {
            showArticleList();
        }
    });
});
