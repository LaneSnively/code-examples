//C++ Tutorial 18 - Simple Snake Game
//https://youtu.be/E_-lMZDi7Uw
//https://youtu.be/W1e5wO7XR2w
//https://youtu.be/PSoLD9mVXTA

#include <iostream>
#include <conio.h>
#include <windows.h>
using namespace std;

bool gameOver;
const int width = 20;
const int height = 20;
int x, y, fruitX, fruitY, score;
int tailX[100], tailY[100];
int nTail;
enum eDirection { STOP = 0, LEFT, RIGHT, UP, DOWN };
eDirection dir;
void setup() 
{
	gameOver = false;
	dir = STOP;
	x = width / 2;
	y = height / 2;
	fruitX = rand() % width;
	fruitY = rand() % height;
	score = 0;
}
void draw()
{
	system("cls"); //system("clear");
	for (int i = 0; i < width+2; i++)
		cout << ".";
	cout << endl;

	for (int i = 0; i < height; i++)
	{
		for (int j = 0; j < width; j++)
		{
			if (j == 0)
				cout << ".";
			if (i == y && j == x)
				cout << "X";
			else if (i == fruitY && j == fruitX)
			{
				cout << "e";
			}
			else
			{
				bool print = false;
				for (int k = 0; k < nTail; k++)
				{
					if (tailX[k] == j && tailY[k] == i)
					{
						cout << "x";
						print = true;
					}
				}
				if (!print)
					cout << " ";
			}

			if (j == width - 1)
				cout << ".";
		}
		cout << endl;
	}

	for (int i = 0; i < width+2; i++)
		cout << ".";
	cout << endl;
	cout << "Score: " << score << endl;

}
void input()
{
	if (_kbhit())
	{
		switch (_getch())
		{
		case 'a':
			dir = LEFT;
			break;
		case 'd':
			dir = RIGHT;
			break;
		case 'w':
			dir = UP;
			break;
		case 's':
			dir = DOWN;
			break;
		case 'x':
			gameOver = true;
			break;
		}
	}
}
void logic()
{
	int prevX = tailX[0];
	int prevY = tailY[0];
	int prev2x, prev2y;
	tailX[0] = x;
	tailY[0] = y;
	for (int i = 1; i < nTail; i++)
	{
		prev2x = tailX[i];
		prev2y = tailY[i];
		tailX[i] = prevX;
		tailY[i] = prevY;
		prevX = prev2x;
		prevY = prev2y;
	}
	switch(dir)
	{
	case LEFT:
		x--;
		break;
	case RIGHT:
		x++;
		break;
	case UP:
		y--;
		break;
	case DOWN:
		y++;
		break;
	default:
		break;
	}
	//gameOver if hit the walls
	//if (x > width || x < 0 || y > height || y < 0)
		//gameOver = true;

	//can go through walls
	if (x >= width) x = 0; 
	else if (x < 0) x = width - 1;
	if (y >= height) y = 0;
	else if (y < 0) y = height - 1;
	//

	for (int i = 0; i < nTail; i++)
		if (tailX[i] == x && tailY[i] == y)
			gameOver = true;

	if (x == fruitX && y == fruitY)
	{
		score += 10;
		fruitX = rand() % width;
		fruitY = rand() % height;
		nTail++;
	}
}

int main()
{
	setup();
	while (!gameOver)
	{
		draw();
		input();
		logic();
		Sleep(10); 
	}
	for (int i = 0; i < 10000000; i++)
	{
		cout << "";
	}
	system("pause");
	return 0;
}