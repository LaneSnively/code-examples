//Lane Snively
//program labels each line of a .txt file with a number.
#include <iostream>
using std::endl;
using std::cout;
#include <fstream>
using std::ifstream;
using std::ofstream;
#include <string>
using std::string;

int main()
{
	cout << "starting.\n";
	ofstream outfile;
	outfile.open("numbered dictionary.txt");
	string line = "";
	string filename = "C:\\dictionary.txt"; //change me to match your directory
	ifstream book;
	book.open(filename);
	if (book.is_open())
	{
		int i = 1;
		while (!book.eof() && book >> line)
		{
			outfile << i << " " << line << "\n";
			i++;
		}
		book.close();
	}
	outfile.close();
	cout << "finished.\n";
	return 0;
}
