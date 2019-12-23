## Instalação
Clone o repositório na sua máquina e entre nele.
```
git clone git@github.com:SelecaoGlobocom/marvin-medeiros.git
cd marvin-medeiros/
```

Utilize a versão `v12.14.0` do nodejs.
```
nvm use v12.14.0
make install
```

## Iniciando o game
Para rodar a aplicação:
```
make start
```

## Testes
Para rodar os testes 
```
make test
```

## Docker
Para rodar o jogo no docker utilize os seguintes comandos:
```
docker build -t marvin_medeiros .
docker run -it marvin_medeiros
```

## Breath of Fantasy

Jogo baseado em turnos onde dois personagens lutam entre si. Cada personagem tem `nome`, `pontos de energia` e `pontos de poder`.
Os pontos de energia e poder são valores numéricos inteiros. 

Por exemplo, no **primeiro turno** o `herói` (o atacante da vez) ataca
o `inimigo` (o defensor da vez) o inimigo terá seus pontos de energia diminuídos, no **segundo turno** o `inimigo` vira o atacante e o `herói` se transforma no defensor.

O dano sofrido, ou seja, os pontos de energia perdidos pelo inimigo, dependem do `fator sorte`. O fator sorte é um `número aleatório de 0 a 100` que é gerado a cada turno da batalha.
Há quatro tipos de ataques que dependem logicamente do fator sorte.

### Fator sorte

* Quando a sorte está entre 0 e 15 o ataque é perdido e não causa dano, imprimindo **"Errou - 0 HP"**
* Quando a sorte está entre 16 e 70 o ataque é normal e causa 1/3 dos pontos de poder do atacante em dano, imprimindo **"Normal - X HP"**
* Quando a sorte está entre 71 e 96 o ataque é sorte e causa 20% a mais do que o ataque normal, imprimindo **"Sorte!!! - X HP"**
* Quando a sorte está entre 97 e 100 o ataque é crítico e causa o dobro de um ataque normal, imprimindo **"Crítico! - X HP"**

**X indica o valor de dano sofrido.**

O jogo segue o esquema de turnos, onde a cada turno um jogador ataca o outro. Ao fim de cada turno os papéis de atacante e defensor se alternam. O jogo acaba quando um dos personagens não tem mais energia para lutar.

### Entrada

Cada personagem será informado usando o seguinte padrão:  `nome energia poder`.

```
Entre o primeiro personagem no seguinte formato:
<nome> <energia> <poder> Ex.: Paulo 100 30
$ nome1 100 10

Primeiro jogador definido 
* Name  : nome1
* Energy: 100
* Power : 10


Entre o segundo personagem no seguinte formato:
<nome> <energia> <poder> Ex.: Paulo 100 30
$ nome2 100 20

Segundo jogador definido 
* Name  : nome2
* Energy: 100
* Power : 20
```

### Saída

O jogo deverá produzir as seguintes saídas:

```
O jogo começou
Batalha entre nome1 e nome2


-----[RODADA 1]-----

-> nome1 atacou nome2!
* D100: 44
* Normal -3 HP
-> nome2 ficou com 97 de energia restante!



-----[RODADA 2]-----

-> nome2 atacou nome1!
* D100: 80
* Sorte!!! -8 HP
-> nome1 ficou com 92 de energia restante!


...

Jogo acabou, o vencedor foi nome1 com HP restante de Y
```