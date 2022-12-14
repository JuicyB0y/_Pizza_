import React, { useCallback, useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';

import { setSearchValue } from '../../redux/slices/filterSlice';
import styles from './Search.module.scss';
import closeIcon from '../../assets/img/close_icon.svg';

const Search = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state: any) => state.filter.searchValue);

  const [localValue, setLocalValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const searchDebounce = useCallback(
    //сохранит ссылку на функцию и вернет ее
    debounce((value) => {
      dispatch(setSearchValue(value));
    }, 300),
    [],
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    searchDebounce(e.target.value);
  };

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setLocalValue('');
    inputRef.current?.focus(); //это тоже типизация
  };

  return (
    <div className={styles.wrapper}>
      <svg
        className={styles.icon}
        height="512px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 512 512"
        width="512px"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z" />
      </svg>
      <input
        ref={inputRef}
        value={localValue}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
        type="text"
      />
      {localValue && <img onClick={onClickClear} className={styles.close} src={closeIcon} alt="closeIcon" />}
    </div>
  );
};

export default Search;
