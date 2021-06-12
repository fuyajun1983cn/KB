#!/usr/bin/env python3

import os
import inspect
import time
from optparse import OptionParser

cur_dir = os.path.dirname(inspect.getfile(inspect.currentframe()))

branch_name = "master"
remote_name = "origin"


def git_clone(url, dest_dir):
    '''
    download third party packaged that cannot get from elpa
    '''
    save_path = os.path.join(cur_dir, "src", dest_dir)
    if os.path.exists(save_path):
        print("{0} already downloaded, just ignore".format(url))
        return
    
    print("Downloading {0} to {1} ...".format(url, save_path))
    cmd = "git clone {0} {1}".format(url, save_path)
    os.system(cmd)


def git_add():
    '''
    git add command
    '''
    print("git add -A .")
    os.system("git add -A .")

def git_commit():
    '''
    git commit command
    '''
    print("git commit");
    t = time.localtime()
    os.system("git commit -m '%s'" % time.strftime("%Y年%m月%d日%H时%M分%S秒"))


def git_push():
    '''
    git push command
    '''
    os.system("git push {0} {1}".format(remote_name, branch_name))

def git_pull():
    '''
    sync with latest file
    '''
    os.system("git pull {0} {1}".format(remote_name, branch_name))
    
if __name__ == "__main__":

    parser = OptionParser()
    parser.add_option("-p", "--pull", action="store_true", dest="sync", help="Sync code from github", default=False)
    parser.add_option("-s", "--submit", action="store_false", dest="sync", help="submit code to github", default=True)
    (options, args) = parser.parse_args()
    if options.sync == True:
        git_pull()
    else:
        git_add()
        git_commit()
        git_push()
