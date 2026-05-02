# IS 181 GROUP GK WORK
&copy; 2026

## FOR GIT MERGE CONFLICTS folow these steps

### Detailed Steps to Resolve Merge Conflicts

* Identify Conflicted Files: Run git status to see which files are causing the conflict. They will be listed under "Unmerged paths".
* Locate Conflicts: Open the affected files in your code editor. Search for the conflict markers:
  1. <<<<<<< HEAD: Shows the changes in your current branch.
  2. ======= Separates your changes from the incoming changes.
  3. :>>>>>>> [branch-name]: Shows the changes from the branch you are merging.
  
* Resolve the Conflict: Edit the file to choose which changes to keep (yours, theirs, or a mix of both) and remove the markers (<<<<<<<, =======, >>>>>>>).

* Stage and Commit:Stage the resolved file: ```git add <filename>```.Commit the resolution: ```git commit -m "Resolved merge conflict in <filename>"```.

  Push Changes: If working on a remote branch, push the fixed commit: ```git push.```
