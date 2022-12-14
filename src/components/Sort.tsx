import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es/exports';
import { setSort, Sort, SortPropertyEnum } from '../redux/slices/filterSlice';

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

export const sortArr: SortItem[] = [
  //указали тип для массива
  { name: 'популярности (DESC)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'популярности (ASC)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'цене (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'цене (ASC)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту (DESC)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту (ASC)', sortProperty: SortPropertyEnum.TITLE_ASC },
];

const SortPopup: React.FC = () => {
  const sortType = useSelector((state: any) => state.filter.sort.name);
  const dispatch = useDispatch();

  const sortRef = useRef<HTMLDivElement>(null); //указали тип

  const [sortVisible, setSortVisible] = useState(false);

  // const sortName = value.name;

  const chooseSort = (obj: SortItem) => {
    // onChangeSort(obj);
    dispatch(setSort(obj));
    setSortVisible(false);
  };

  // это функционал для закрытия окна при клике на другую область
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // const _event = event as PopupClick;
      if (sortRef.current && !event.path.includes(sortRef.current)) {
        setSortVisible(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    // это произойдет когда элемент размонтируется, это нужно чтобы события не накапливались когда мы заходим на страницу с этим компонентом
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setSortVisible(!sortVisible)}>{sortType}</span>
      </div>
      {sortVisible && (
        <div className="sort__popup">
          <ul>
            {sortArr.map((obj, i) => (
              <li className={sortType === obj.name ? 'active' : ''} onClick={() => chooseSort(obj)} key={i}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortPopup;
