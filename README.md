# Test
________
#### Приложение максимально простое, без особой стилизации, без модульного подохода, есть пару комментариев.
________
#### В целом, использовал IndexedDB для хранения информации, потому что: 
- LocalStorage хранит значения в строковом формате, и нужно все время парсить это в объекты.
- Cookie подгружаются вместе с каждым http запросом, что не особо нужно
- WebSQL как вариант, но я раньше работал с MongoDB, которая является NoSQL и я привык на ней работать.
#### В целом, реализован весь функционал, за исключением получения объекта хранения для последующей итерации и добавление через for in в DOM дерево.
