# Лекция 23

## Алгоритмы модифицирующие последовательность

* копирующие(`copy`, `transform`, `replace`, ...)

`transform` - `map` в мире функциональных языков.


* перестановки(`swap`, `swap_iter`, `random_shuffle`, `shuffle` + PRNG, ...)

PRNG - pseudo-random number generator. см заголовочный файл `<random>`.



```cpp
transform(v.begin(), v.end(), v.begin(), [](int x){return x + 1;});
```

```cpp
vector<int> v1{1, 2, 3};
int a[] {2, -2, 8};
list<int> l;

transform(begin(v1), end(v1), a, back_inserter(1), std::max<int>)

assert(1 == (list<int>{2, 2, 8}));
```

```cpp
template<typename It, typename F>
It remove_if(It b, It e, F f)...
```

```cpp
auto it = remove_if(begin(v1), end(v1), [](int x){return !(x%2)});
assert (v1 == (vector<int>{1, 3, 2})); [b, it)
assert (*it == 2);

v1.erase(it, end(v1));
```


```cpp
selection_sort(It b, It e)
{
	while(b != e) {
		It min = min_element(b, e);
		swap_iter(b, min);
		++b;
	}
}
```

```cpp
template<typename Cont>
class rnd_it {
	Cont * c;
	vector<int> pos;
	vector<int>::iterator it;

public:
	rnd_it(cont & c): c(&c)
	{
		int n = 0;
		generate_n(back_inserter(pos), c->size(), [&](){
			return n++;
		});
		random_shuffle(begin(pos), end(pos), end(pos));
		it = begin(pos);
	}
	
	rnd_it&
	operator++() {++it; return *this;}

	typename Cont::value_type&
	operator *(){
		return *std:next(begin(*c), *it);
	}

	friend
	template<typename C>
	bool operator!=(rnd_it<C> const & it1, rnd_it<C> const & it2)
	{
		
	}
};
```












