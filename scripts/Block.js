'use strict';

class Block {
  
  constructor(obj) {
    this.itemTemplate = obj.itemTemplate;
    this.content = obj.block.content;
    this.id = obj.index + 1;
    this.containerTemplate = obj.containerTemplate;
    this.state = obj.state;
    this.rerenderFunction = obj.rerenderFunction;
    this.setCursor = obj.setCursor;
  }

  create() {
    this.item = this.itemTemplate.cloneNode('true');
    this.container = this.containerTemplate.cloneNode('true');
    this.menu = this.container.querySelector('.side-menu');
    this.deleteButton = this.menu.querySelector('.side-menu__button_type_delete');
    this.addTitleButton = this.menu.querySelector('.side-menu__button_type_title');
    this.addTextButton = this.menu.querySelector('.side-menu__button_type_text');
    this.moveButton = this.menu.querySelector('.side-menu__button_type_move');
    this.item.textContent = this.content;
    this.item.dataset.id = this.id;
    this.container.appendChild(this.item);

    this.setEventListeners();
    return this.container;
  }

  blurHandler = (evt) => {
    const id = evt.target.dataset.id,
    content = evt.target.textContent;

    this.state.setBlockContent(id, content);
  }

  handlerDelete = (evt) => {
    this.removeEventListeners();
    const itemID = evt.target.closest('.block-container').querySelector('.item').dataset.id;
    this.state.deleteBlock(itemID);
    this.rerenderFunction();
  }
  moveUnlocker=()=> {
    this.container.setAttribute('draggable',true)
    this.moveButton.addEventListener('mouseleave',this.moveLocker)
    this.state.setOldId(this.id)
  }
  moveLocker=()=> {
    this.container.removeAttribute('draggable')
  }
  onDragEnter = ()=> {
    this.item.classList.add('item_on-drop')
  }
  onDragLeave = ()=> {
    this.item.classList.remove('item_on-drop')
  }
  onDragOver(evt){
    evt.preventDefault()
  }
  onDrop = () => {
    this.state.replaceBlock(this.id)    
    this.rerenderFunction()
  }
  addText = () => {
    this.state.addNewBlock(this.id,'text','')
    this.rerenderFunction()
    this.setCursor(this.id)
  }
  addTitle = () => {   
    this.state.addNewBlock(this.id,'title','')
    this.rerenderFunction()
    this.setCursor(this.id)
  }

  setEventListeners() {
    this.item.addEventListener('blur', this.blurHandler);
    this.deleteButton.addEventListener('click', this.handlerDelete)
    this.moveButton.addEventListener('mousedown',this.moveUnlocker)
    this.item.addEventListener('dragenter',this.onDragEnter) 
    this.item.addEventListener('dragleave',this.onDragLeave)   
    this.item.addEventListener('dragover',this.onDragOver)       
    this.item.addEventListener('drop',this.onDrop)        
    this.addTitleButton.addEventListener('click',this.addTitle)
    this.addTextButton.addEventListener('click',this.addText)
  }
  removeEventListeners(){
    this.item.removeEventListener('blur', this.blurHandler);
    this.deleteButton.removeEventListener('click', this.handlerDelete)
    this.moveButton.removeEventListener('mousedown',this.moveUnlocker)
    this.item.removeEventListener('dragenter',this.onDragEnter) 
    this.item.removeEventListener('dragleave',this.onDragLeave)   
    this.item.removeEventListener('dragover',this.onDragOver)       
    this.item.removeEventListener('drop',this.onDrop)        
    this.addTitleButton.removeEventListener('click',this.addTitle)
    this.addTextButton.removeEventListener('click',this.addText)
    this.moveButton.addEventListener('mouseleave',this.moveLocker)
  }
}