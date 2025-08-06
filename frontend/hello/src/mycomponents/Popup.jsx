import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function Popup({ open, setOpen }) {
    const [roomID, setRoomID] = useState('');
    const navigate = useNavigate();

    const handleJoin = () => {
        if (roomID.trim()) {
            navigate(`/room/${roomID.trim()}`);
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className=" bg-background dark text-gray-100 sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Enter Room ID</DialogTitle>
                </DialogHeader>
                <Input
                    placeholder="e.g. room123"
                    value={roomID}
                    onChange={(e) => setRoomID(e.target.value)}
                />
                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button variant="outline" className={`hover:text-white`} >Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleJoin}>Join</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default Popup;

