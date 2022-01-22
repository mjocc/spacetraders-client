**********************************************
*    NOTE: SEE TODO COMMENTS ACROSS FILES    *
**********************************************

### TODO
- [ ] Add a command history with links to each command result, an option to rerun, time run, etc.
  - [ ] Make up arrow on keyboard when on command bar revert to previous command like in shell
  - [x] Have /command-results recieve an id prop which it uses to access the command id from redux
  - [ ] Improve pagination on /command-history
- [x] Add view results/rerun command/delete entry icon buttons to history and results page with tooltips
- [x] Put API docs into popup iframe
- [x] Add format and lint commit hooks with husky
- [ ] Use RTK query for getting API data from spacetraders for UI
- [x] Add custom toast text option to runCommand and change rerun command to use it