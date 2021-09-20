## Тестовое задание для Wisebits
### Техническое описание
 
Написать компонент вида
```typescript
interface IProps {
  with: FC | string
  text: string[]
  }
 
const HighlightText = (props:IProps)=>{...}
```

который выводит текст в котором перечисленные в свойстве text строки оборачиваются в тег или компонент переданный в свойстве with.
Пример:
```typescript jsx
function example(){
  return <HighlightText with="span" text={['bar']}>foo bar baz</HighlightText>
}
```

выведет
```html
foo <span>bar</span> baz
```
 
Стек: react, typescript
 
Допускается использование сторонних библиотек
 
Тесты приветствуются
 
Текста может быть очень много