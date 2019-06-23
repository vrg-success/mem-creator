import React from 'react';
import { Title } from '../../components/common/title/title';
import FileUpload from './components/fileUpload/fileUpload';
import SliderImages from './components/sliderImages/SliderImages';
import Editor from './components/editor/editor';


export const Create = () => (
  <div className="container">
    <Title type="h1">Выберите изображение</Title>
    <FileUpload />
    <SliderImages />
    <Editor />
  </div>
);