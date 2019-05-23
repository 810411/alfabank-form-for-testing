import React, {Fragment, useState} from 'react';

import './App.css';
import logo from './Alfa-Bank_logo_red_rus.png';

import GridRow from "arui-feather/grid-row";
import GridCol from "arui-feather/grid-col";
import Heading from "arui-feather/heading";
import Link from "arui-feather/link";

import FormOne from "./Form-one";
import FormTwo from "./Form-two";

const App = () => {
  const [currentView, setCurrentView] = useState('selection');
  const [result, setResult] = useState('selection');
  const selectionLink = (<Link
    text='Выбрать вариант анкеты' size='m'
    onClick={() => setCurrentView('selection')}
  />);
  return (
    <Fragment>
      <GridRow>
        <GridCol width={{mobile: 2, tablet: 3}} offset='3' style={{overflow: 'hidden'}}>
          <img src={logo} alt="Логотип" width="180"/>
        </GridCol>
      </GridRow>
      <GridRow justify='center'>
        <GridCol width={{mobile: 10, tablet: 6, desktop: {s: 6, l: 4, xl: 3}}}>
          <Heading size='m'>
            Заявка на дебетовую карту
          </Heading>
          {currentView === 'selection' &&
          <Fragment>
            <p><Link
              text='Анкета вариант 1' size='l'
              onClick={() => setCurrentView('formOne')}
            /></p>
            <p><Link
              text='Анкета вариант 2' size='l'
              onClick={() => setCurrentView('formTwo')}
            /></p>
            <p><Link
              url="http://localhost:8000/users"
              target='_blank'
              text='Просмотреть все записи из базы данных'
              size='l'
            /></p>
          </Fragment>}
          {currentView === 'formOne' &&
          <Fragment>
            <FormOne setResult={setResult} setCurrentView={setCurrentView}/>
            {selectionLink}
          </Fragment>}
          {currentView === 'formTwo' &&
          <Fragment>
            <FormTwo setResult={setResult} setCurrentView={setCurrentView}/>
            {selectionLink}
          </Fragment>}
          {currentView === 'result' &&
          <Fragment>
            <p>Ответ сервера:</p>
            <p>{result.status}</p>
            <p>{result.statusText}</p>
            <pre style={{wordWrap: 'break-word', whiteSpace: 'pre-wrap'}}>
              {JSON.stringify(result.data)}
            </pre>
            {selectionLink}
          </Fragment>}
        </GridCol>
      </GridRow>
    </Fragment>
  );
};

export default App
