# Logic helpers

The logic helpers enable logic operations in handlebars statements.

## and         

Performs the Javascript equivalent of `if (a && b && ...)`

```hbs
{{if (and a b ...)}}
```

## begs-with   

Performs the Javascript equivalent of `if (a.indexOf(b) === 0)`

```hbs
{{if (begs-with a b)}}
```

## ends-with   

Performs the Javascript equivalent of `if (a.indexOf(b, a.length - b.length) !== -1)`

```hbs
{{if (ends-with a b)}}
```

## eq          

Performs the Javascript equivalent of `if (a === b)`

```hbs
{{if (eq a b)}}
```

## gt          

Performs the Javascript equivalent of `if (a > b)`

```hbs
{{if (gt a b)}}
```

## gte         

Performs the Javascript equivalent of `if (a >= b)`

```hbs
{{if (gte a b)}}
```

## inside      

Performs the Javascript equivalent of `if (a.indexOf(b) > -1)`

```hbs
{{if (inside a b)}}
```

## is          

Performs the Javascript equivalent of `if (a === true ...)`

```hbs
{{if (is a ...)}}
```

## isnt        

Performs the Javascript equivalent of `if (a !== true ...)`

```hbs
{{if (isnt a ...)}}
```

## ix          

Performs the Javascript equivalent of `if (a !== true ...)`

```hbs
{{if (ix a ...)}}
```

## lt          

Performs the Javascript equivalent of `if (a < b)`

```hbs
{{if (lt a b)}}
```

## lte         

Performs the Javascript equivalent of `if (a <= b)`

```hbs
{{if (lte a b)}}
```

## ne          

Performs the Javascript equivalent of `if (a !== b)`

```hbs
{{if (ne a b))}}
```

## not         

Performs the Javascript equivalent of `if (!a && !b && ...)`

```hbs
{{if (not a b))}}
```

## or          

Performs the Javascript equivalent of `if (a || b || ...)`

```hbs
{{if (or a b ...)}}
```

## present     

Performs the Javascript equivalent of `if (Ember.isPresent(a) ...)`

```hbs
{{if (present a ...)}}
```

## xor         

Performs the Javascript equivalent of `if (a && !b || !a && b)`

```hbs
{{if (xor a b)}}
```

