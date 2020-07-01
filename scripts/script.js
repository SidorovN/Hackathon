'use strict';

const state = new State(initialContent.corrections);
const pageHeader = document.querySelector('title');

const containerTemplate = document.querySelector('#container-template').content.querySelector('.block-container'),
    subtitleTemplate = document.querySelector('#subtitle-template').content.querySelector('.subtitle'),
    paragraphTemplate = document.querySelector('#paragraph-template').content.querySelector('.paragraph');

const blocksList = new BlocksList(document.querySelector('.blocks-container'));
const createBlockItem = (obj) => new Block(obj).create();


// Рендерим блоки
const blockItems = state.pullData().blocks
    .map(block => {
        let itemTemplate;
        switch (block.type) {
            case 'title':
                itemTemplate = subtitleTemplate;
                return createBlockItem({block, state, itemTemplate, containerTemplate});
            case 'text':
                itemTemplate = paragraphTemplate;
                return createBlockItem({block, state, itemTemplate, containerTemplate});
        }   
    });
blocksList.render(blockItems);