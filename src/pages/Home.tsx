import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import qs from 'qs';

import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate, Link } from 'react-router-dom';

import { setCurrentPage, setFilters, setCategoryId, FilterSliceState } from '../redux/slices/filterSlice';
import { fetchPizzas, SearchPizzaParams } from '../redux/slices/pizzasSlice';

import Categories from '../components/Categories';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Sort, { sortArr } from '../components/Sort';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector((state: any) => state.filter);
  const { items, status } = useSelector((state: any) => state.pizza);

  // const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [categoryId, setCategoryId] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);

  // const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });

  // const { searchValue } = useContext(SearchContext);

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    setIsLoading(true);
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        currentPage: String(currentPage),
      }),
    );
    window.scrollTo(0, 0);
  };

  // const fetchPizzas = async () => {
  //   setIsLoading(true);
  //   const sortBy = sort.sortProperty.replace('-', '');
  //   const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
  //   const category = categoryId > 0 ? `category=${categoryId}` : '';

  //   await axios
  //     .get(
  //       `https://628e2b5a368687f3e711ad5f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`,
  //     )
  //     .then((res) => {
  //       setItems(res.data);
  //       setIsLoading(false);
  //     });
  // };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.slice(1)) as unknown as SearchPizzaParams;

      const sortedObj = sortArr.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        //@ts-ignore
        setFilters({
          // searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortArr[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const pizzas = items
    .filter((obj: any) => obj.title.toLowerCase().includes(searchValue))
    .map((item: any) => <PizzaBlock {...item} key={item.id} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось получить пиццы</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination onChangePage={onChangePage} currentPage={currentPage} />
    </div>
  );
};

export default Home;
