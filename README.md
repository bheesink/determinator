# Determinator

This project is used to determine who should pick up groceries when present at the Leukeleu office.


## How does it work?

Once the script decided, it is irreversible and there can't be any discussion anymore who will get the groceries that day.

Questioning this method is only possible by implementing an improvement via a pull request that has been approved by at least one colleague. If you don't respect this process you can face a penalty of doing the shopping ten times (e.g. two weeks) in a row.


## Usage

First edit the `determ.py` file, so only people who are present at the office are in the attendees list.

If the list is complete, run the script at the command line:

    $ cd /path/to/determinator
    $ python ./determ.py
